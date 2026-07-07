import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
  McpError,
  ErrorCode,
} from "@modelcontextprotocol/sdk/types.js";
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname, basename, extname, relative } from "node:path";
import { fileURLToPath } from "node:url";

// ─── Types ────────────────────────────────────────────────────────────

interface PropDef {
  name: string;
  type: string;
  required: boolean;
  defaultValue: string | undefined;
  description: string;
}

interface EmitDef {
  name: string;
  payload: string;
  description: string;
}

interface SlotDef {
  name: string;
  params: string;
  description: string;
}

interface ComponentInfo {
  name: string;
  fileName: string;
  filePath: string;
  description: string;
  category: string;
  props: PropDef[];
  emits: EmitDef[];
  slots: SlotDef[];
  rekaImports: string[];
}

interface ScanResult {
  components: Record<string, ComponentInfo>;
}

// ─── Helpers ──────────────────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** Resolve the project root by walking up from __dirname until we find pnpm-workspace.yaml */
function findProjectRoot(): string {
  let dir = __dirname;
  while (dir !== dirname(dir)) {
    if (existsSync(join(dir, "pnpm-workspace.yaml"))) return dir;
    dir = dirname(dir);
  }
  // Fallback: assume we run from the project root
  return process.cwd();
}

const PROJECT_ROOT = findProjectRoot();
const COMPONENTS_DIR = join(PROJECT_ROOT, "packages", "vue", "src", "components");
const TOKENS_SRC = join(PROJECT_ROOT, "packages", "tokens", "src");

// ─── Component Scanner ────────────────────────────────────────────────

/**
 * Categorize a component based on its file path or name conventions.
 */
function categorizeComponent(name: string): string {
  const lower = name.toLowerCase();
  if (lower.startsWith("datepicker")) return "date-picker";
  if (lower.startsWith("alertdialog")) return "alert-dialog";
  if (lower.startsWith("dropdownmenu")) return "dropdown-menu";
  if (lower.startsWith("scrollarea")) return "scroll-area";
  if (lower.startsWith("skeleton")) return "skeleton";
  if (lower.startsWith("numberfield")) return "number-field";
  if (lower.startsWith("togglegroup")) return "toggle-group";
  if (lower.startsWith("combobox")) return "combobox";
  if (lower.startsWith("collapsible")) return "collapsible";
  if (lower.startsWith("accordion")) return "accordion";
  if (lower.startsWith("tooltip")) return "tooltip";
  if (lower.startsWith("breadcrumb")) return "breadcrumb";
  if (lower.startsWith("pagination")) return "pagination";
  if (lower.startsWith("popover")) return "popover";
  if (lower.startsWith("datatable")) return "data-table";
  if (lower.startsWith("tagsinput")) return "tags-input";
  if (lower.startsWith("checkbox")) return "checkbox";
  if (lower.startsWith("textarea")) return "textarea";
  if (lower.startsWith("avatar")) return "avatar";
  if (lower.startsWith("dialog")) return "dialog";
  if (lower.startsWith("drawer")) return "drawer";
  if (lower.startsWith("select")) return "select";
  if (lower.startsWith("switch")) return "switch";
  if (lower.startsWith("slider")) return "slider";
  if (lower.startsWith("radio")) return "radio";
  if (lower.startsWith("input")) return "input";
  if (lower.startsWith("button")) return "button";
  if (lower.startsWith("badge")) return "badge";
  if (lower.startsWith("alert")) return "alert";
  if (lower.startsWith("card")) return "card";
  if (lower.startsWith("tag")) return "tag";
  if (lower.startsWith("tabs")) return "tabs";
  if (lower.startsWith("toast")) return "toast";
  if (lower.startsWith("kbd")) return "kbd";
  if (lower.startsWith("metric")) return "metric";
  if (lower.startsWith("dashlist")) return "dash-list";
  if (lower.startsWith("quote")) return "quote";
  if (lower.startsWith("progress")) return "progress";
  if (lower.startsWith("divider")) return "divider";
  if (lower.startsWith("empty")) return "empty";
  if (lower.startsWith("form")) return "form";
  return "other";
}

/**
 * Parse JSDoc descriptions and property definitions from an interface body.
 */
function parsePropsInterface(
  body: string
): { name: string; type: string; required: boolean; description: string }[] {
  const props: { name: string; type: string; required: boolean; description: string }[] = [];
  const lines = body.split("\n");
  let currentDescription = "";
  let inBlockComment = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines and standalone closing braces
    if (!trimmed || trimmed === "}" || trimmed.startsWith("//")) continue;

    // Block comment handling
    if (trimmed.startsWith("/**")) {
      currentDescription = "";
      inBlockComment = true;
      if (trimmed.endsWith("*/")) {
        const inner = trimmed
          .replace(/\/\*\*\s*/, "")
          .replace(/\s*\*\//, "")
          .trim();
        if (inner) currentDescription = inner;
        inBlockComment = false;
      }
      continue;
    }
    if (inBlockComment) {
      if (trimmed.endsWith("*/")) {
        const inner = trimmed
          .replace(/^\s*\*/, "")
          .replace(/\s*\*\//, "")
          .trim();
        if (inner) currentDescription += (currentDescription ? " " : "") + inner;
        inBlockComment = false;
        continue;
      }
      const commentText = trimmed.replace(/^\s*\*\s?/, "").trim();
      if (commentText) {
        currentDescription += (currentDescription ? " " : "") + commentText;
      }
      continue;
    }

    // Property declaration: optional name followed by : type
    const propMatch = trimmed.match(/^(\w+)(\??)\s*:\s*(.*)/);
    if (propMatch) {
      const name = propMatch[1];
      const optional = propMatch[2] === "?";
      let typeStr = propMatch[3];

      // Handle multi-line inline object types by counting braces
      let braceCount = _braceDiff(typeStr);
      // Also handle continuation when the line doesn't end with ; or ,
      // or when the next line starts with | (union type continuation)
      let nextLineIndex = i + 1;
      while (true) {
        // If braces are balanced and line ends cleanly, stop
        if (braceCount <= 0) {
          const cleaned = typeStr.replace(/;\s*$/, "").trim();
          const endsCleanly =
            /;\s*$/.test(typeStr) || /,\s*$/.test(typeStr) || cleaned.endsWith(">");
          if (endsCleanly || nextLineIndex >= lines.length) break;
        }
        // Check next line
        const nextLine = lines[nextLineIndex].trim();
        if (!nextLine || nextLine === "}" || nextLine === "*/" || nextLine.startsWith("*")) break;
        // Stop if next line looks like a new property
        if (braceCount <= 0 && /^\w+(\??)\s*:/.test(nextLine)) break;
        // Continue reading
        typeStr += " " + nextLine;
        braceCount += _braceDiff(nextLine);
        nextLineIndex++;
        // Safety: stop reading after 20 lines
        if (nextLineIndex - i > 20) break;
      }
      i = nextLineIndex - 1;

      typeStr = typeStr.replace(/;\s*$/, "").replace(/,\s*$/, "").trim();
      // Clean up leading union pipe from multi-line continuation
      typeStr = typeStr.replace(/^\|\s*/, "");

      props.push({
        name,
        type: typeStr,
        required: !optional,
        description: currentDescription,
      });
      currentDescription = "";
      i = nextLineIndex - 1;
    }
  }

  return props;
}

function _braceDiff(s: string): number {
  let count = 0;
  for (const ch of s) {
    if (ch === "{") count++;
    else if (ch === "}") count--;
  }
  return count;
}

/**
 * Extract the first JSDoc block comment from script content (component-level).
 */
function extractComponentDescription(script: string): string {
  const match = script.match(/\/\*\*\s*\n([\s\S]*?)\s*\*\//);
  if (!match) return "";
  return match[1]
    .split("\n")
    .map((l) => l.replace(/^\s*\*\s?/, "").trim())
    .filter(Boolean)
    .join(" ");
}

/** Extract props interface name from defineProps<>() */
function extractDefinePropsName(script: string): string | null {
  const m = script.match(/defineProps<(\w+)>/);
  return m ? m[1] : null;
}

/** Extract props interface body by name */
function extractInterfaceBody(script: string, ifaceName: string): string | null {
  // Match `export interface Name { ... }` (handles nested braces)
  const startIdx = script.search(new RegExp(`export\\s+interface\\s+${ifaceName}\\s*\\{`));
  if (startIdx === -1) return null;

  const braceStart = script.indexOf("{", startIdx);
  if (braceStart === -1) return null;

  let depth = 1;
  let pos = braceStart + 1;
  while (depth > 0 && pos < script.length) {
    if (script[pos] === "{") depth++;
    else if (script[pos] === "}") depth--;
    pos++;
  }

  return script.slice(braceStart + 1, pos - 1);
}

/** Extract withDefaults() default values */
function extractDefaults(script: string): Record<string, string> {
  const defaults: Record<string, string> = {};
  const m = script.match(/withDefaults\(\s*defineProps<\w+>\(\)\s*,\s*\{([\s\S]*?)\}\s*\)/);
  if (!m) return defaults;

  const body = m[1];
  const re = /(\w+)\s*:\s*([^,\n]+)/g;
  let match;
  while ((match = re.exec(body)) !== null) {
    defaults[match[1]] = match[2].trim();
  }
  return defaults;
}

/** Extract defineEmits<> */
function extractEmits(script: string): EmitDef[] {
  const emits: EmitDef[] = [];
  const m = script.match(/defineEmits<\{([\s\S]*?)\}>/);
  if (!m) return emits;

  const body = m[1];
  const re = /\/\*\*\s*\n([\s\S]*?)\s*\*\/\s*\n\s*["'](\w[\w:-]*)["']\s*:\s*([^;]+);/g;
  let match;
  while ((match = re.exec(body)) !== null) {
    const desc = match[1]
      .split("\n")
      .map((l) => l.replace(/^\s*\*\s?/, "").trim())
      .filter(Boolean)
      .join(" ");
    emits.push({
      name: match[2],
      payload: match[3].trim(),
      description: desc,
    });
  }

  // also match emits without JSDoc
  const simpleRe = /["'](\w[\w:-]*)["']\s*:\s*([^;]+);/g;
  while ((match = simpleRe.exec(body)) !== null) {
    const name = match[1];
    if (!emits.some((e) => e.name === name)) {
      emits.push({ name, payload: match[2].trim(), description: "" });
    }
  }

  return emits;
}

/** Extract defineSlots<> */
function extractSlots(script: string): SlotDef[] {
  const slots: SlotDef[] = [];
  const m = script.match(/defineSlots<\{([\s\S]*?)\}>/);
  if (!m) return slots;

  const body = m[1];
  const re = /(\w[\w-]*)\??\s*:\s*\(([^)]*)\)\s*=>\s*unknown/g;
  let match;
  while ((match = re.exec(body)) !== null) {
    slots.push({
      name: match[1],
      params: match[2].trim(),
      description: "",
    });
  }

  // default slot (no key, just () => unknown)
  const defaultSlotMatch = body.match(/\(\)\s*=>\s*unknown/);
  if (defaultSlotMatch && !slots.some((s) => s.name === "default")) {
    slots.unshift({
      name: "default",
      params: "()",
      description: "",
    });
  }

  return slots;
}

/** Extract imports from reka-ui */
function extractRekaImports(script: string): string[] {
  const imports: string[] = [];
  const re = /import\s+\{([^}]+)\}\s+from\s+['"]reka-ui['"]/g;
  let match;
  while ((match = re.exec(script)) !== null) {
    const names = match[1]
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean);
    imports.push(...names);
  }
  return imports;
}

/**
 * Parse a single Vue component file into ComponentInfo
 */
function parseComponentFile(filePath: string): ComponentInfo | null {
  const fileName = basename(filePath, ".vue");
  if (!fileName.startsWith("Mizu")) return null;

  const name = fileName.replace("Mizu", "");
  const content = readFileSync(filePath, "utf-8");

  // Extract <script setup> content
  const scriptMatch = content.match(/<script\s+setup\s+lang="ts">([\s\S]*?)<\/script>/);
  if (!scriptMatch) return null;

  const script = scriptMatch[1];

  // Props
  const propsIfaceName = extractDefinePropsName(script);
  let props: PropDef[] = [];
  const defaults = extractDefaults(script);

  if (propsIfaceName) {
    const ifaceBody = extractInterfaceBody(script, propsIfaceName);
    if (ifaceBody) {
      const parsed = parsePropsInterface(ifaceBody);
      props = parsed.map((p) => ({
        ...p,
        defaultValue: defaults[p.name],
      }));
    }
  }

  // Emits & Slots
  const emits = extractEmits(script);
  const slots = extractSlots(script);

  // Reka imports
  const rekaImports = extractRekaImports(script);

  // Description
  const description = extractComponentDescription(script);

  // Category
  const category = categorizeComponent(name);

  return {
    name,
    fileName,
    filePath: relative(PROJECT_ROOT, filePath),
    description,
    category,
    props,
    emits,
    slots,
    rekaImports,
  };
}

/**
 * Scan all component files and build the index.
 */
function scanComponents(): ScanResult {
  const components: Record<string, ComponentInfo> = {};

  if (!existsSync(COMPONENTS_DIR)) {
    console.error(`Components directory not found: ${COMPONENTS_DIR}`);
    return { components };
  }

  const files = readdirSync(COMPONENTS_DIR);
  // Sort to match the original filter: exclude skeleton-types.ts
  for (const file of files.sort()) {
    if (!file.endsWith(".vue")) continue;
    const filePath = join(COMPONENTS_DIR, file);
    const info = parseComponentFile(filePath);
    if (info) {
      components[info.name] = info;
    }
  }

  return { components };
}

// ─── Token Scanner ────────────────────────────────────────────────────

function scanTokens(): Record<string, unknown> {
  // Read the generated tokens index if it exists
  const tokensIndex = join(PROJECT_ROOT, "packages", "tokens", "src", "index.ts");
  if (!existsSync(tokensIndex)) return {};

  try {
    const content = readFileSync(tokensIndex, "utf-8");
    const tokens: Record<string, unknown> = {};
    const exportRe = /export\s+(const|function|type|interface)\s+(\w+)/g;
    let match;
    while ((match = exportRe.exec(content)) !== null) {
      tokens[match[2]] =
        match[1] === "type" || match[1] === "interface" ? "(type declaration)" : "(value)";
    }
    return tokens;
  } catch {
    return {};
  }
}

// ─── MCP Server ───────────────────────────────────────────────────────

/** Lazy accessors so the MCP server always reads fresh data from disk */
function getScanResult(): ScanResult {
  return scanComponents();
}

function getTokens(): Record<string, unknown> {
  return scanTokens();
}

const server = new Server(
  {
    name: "mizu-design-system",
    version: "0.1.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

// ── Resources ──────────────────────────────────────────────────────────

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  const resources = [];

  // Component list resource
  resources.push({
    uri: "mizu://components",
    name: "Components",
    description: "List of all Mizu UI components",
    mimeType: "application/json",
  });

  // Per-component resources
  for (const [name, _info] of Object.entries(getScanResult().components)) {
    resources.push({
      uri: `mizu://components/${name}`,
      name: `Component: ${name}`,
      description: `Documentation for the ${name} component`,
      mimeType: "application/json",
    });
    resources.push({
      uri: `mizu://components/${name}/source`,
      name: `Source: ${name}`,
      description: `Vue SFC source code for the ${name} component`,
      mimeType: "text/plain",
    });
  }

  // Tokens resource
  resources.push({
    uri: "mizu://tokens",
    name: "Design Tokens",
    description: "Mizu UI design tokens overview",
    mimeType: "application/json",
  });

  return { resources };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  if (uri === "mizu://components") {
    const componentList = Object.entries(getScanResult().components)
      .map(([name, info]) => ({
        name,
        category: info.category,
        description: info.description || "No description",
        props: info.props.length,
        emits: info.emits.length,
        slots: info.slots.length,
        rekaImports: info.rekaImports.length > 0,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return {
      contents: [
        {
          uri,
          mimeType: "application/json",
          text: JSON.stringify(
            {
              total: componentList.length,
              components: componentList,
            },
            null,
            2
          ),
        },
      ],
    };
  }

  const componentMatch = uri.match(/^mizu:\/\/components\/(\w+)(?:\/(source))?$/);
  if (componentMatch) {
    const [, name, sourceFlag] = componentMatch;
    const info = getScanResult().components[name];
    if (!info) {
      throw new McpError(ErrorCode.InvalidRequest, `Component "${name}" not found`);
    }

    if (sourceFlag === "source") {
      const absPath = join(PROJECT_ROOT, info.filePath);
      const source = existsSync(absPath)
        ? readFileSync(absPath, "utf-8")
        : "// Source file not found";

      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: source,
          },
        ],
      };
    }

    return {
      contents: [
        {
          uri,
          mimeType: "application/json",
          text: JSON.stringify(info, null, 2),
        },
      ],
    };
  }

  if (uri === "mizu://tokens") {
    return {
      contents: [
        {
          uri,
          mimeType: "application/json",
          text: JSON.stringify(
            {
              total: Object.keys(getTokens()).length,
              tokens: getTokens(),
              note: "Token values are defined in packages/tokens/",
            },
            null,
            2
          ),
        },
      ],
    };
  }

  throw new McpError(ErrorCode.InvalidRequest, `Unknown resource: ${uri}`);
});

// ── Tools ──────────────────────────────────────────────────────────────

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "search_components",
      description: "Search Mizu UI components by name, category, or keyword",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Search query (searches name, category, and description)",
          },
          category: {
            type: "string",
            description:
              "Filter by component category (e.g., form, button, dialog, overlay, layout, data)",
          },
        },
        required: [],
      },
    },
    {
      name: "get_component",
      description: "Get full component API documentation including props, slots, and emits",
      inputSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Component name without the Mizu prefix (e.g., Button, Input, DialogRoot)",
          },
        },
        required: ["name"],
      },
    },
    {
      name: "get_component_source",
      description: "Get the raw Vue SFC source code for a component",
      inputSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Component name without the Mizu prefix (e.g., Button, Input)",
          },
        },
        required: ["name"],
      },
    },
    {
      name: "list_components_by_category",
      description: "List all components grouped by their category",
      inputSchema: {
        type: "object",
        properties: {},
        required: [],
      },
    },
    {
      name: "get_tokens",
      description: "List all design tokens defined in the project",
      inputSchema: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "search_components": {
      const query = (args?.query as string)?.toLowerCase() || "";
      const category = (args?.category as string)?.toLowerCase() || "";

      const results = Object.values(getScanResult().components).filter((info) => {
        if (category && info.category.toLowerCase() !== category) return false;
        if (!query) return true;
        return (
          info.name.toLowerCase().includes(query) ||
          info.category.toLowerCase().includes(query) ||
          (info.description && info.description.toLowerCase().includes(query)) ||
          info.props.some((p) => p.name.toLowerCase().includes(query))
        );
      });

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                total: results.length,
                query: query || "(all)",
                category: category || "(all)",
                components: results.map((c) => ({
                  name: c.name,
                  category: c.category,
                  description: c.description || "No description",
                  propCount: c.props.length,
                  emitCount: c.emits.length,
                  slotCount: c.slots.length,
                })),
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case "get_component": {
      const compName = args?.name as string;
      if (!compName) {
        throw new McpError(ErrorCode.InvalidParams, "Component name is required");
      }

      const info = getScanResult().components[compName];
      if (!info) {
        throw new McpError(
          ErrorCode.InvalidRequest,
          `Component "${compName}" not found. Use search_components to find available components.`
        );
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(info, null, 2),
          },
        ],
      };
    }

    case "get_component_source": {
      const sourceName = args?.name as string;
      if (!sourceName) {
        throw new McpError(ErrorCode.InvalidParams, "Component name is required");
      }

      const info = getScanResult().components[sourceName];
      if (!info) {
        throw new McpError(ErrorCode.InvalidRequest, `Component "${sourceName}" not found`);
      }

      const absPath = join(PROJECT_ROOT, info.filePath);
      const source = existsSync(absPath)
        ? readFileSync(absPath, "utf-8")
        : "// Source file not found";

      return {
        content: [
          {
            type: "text",
            text: source,
          },
        ],
      };
    }

    case "list_components_by_category": {
      const byCategory: Record<string, string[]> = {};
      for (const info of Object.values(getScanResult().components)) {
        if (!byCategory[info.category]) byCategory[info.category] = [];
        byCategory[info.category].push(info.name);
      }
      for (const cat of Object.keys(byCategory)) {
        byCategory[cat].sort();
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                total: Object.keys(getScanResult().components).length,
                categories: Object.keys(byCategory).sort(),
                componentsByCategory: byCategory,
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case "get_tokens": {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                total: Object.keys(getTokens()).length,
                tokens: getTokens(),
                note: "Token values are defined in packages/tokens/",
              },
              null,
              2
            ),
          },
        ],
      };
    }

    default:
      throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
  }
});

// ── Start ──────────────────────────────────────────────────────────────

async function main() {
  console.error(`Mizu Design System MCP Server`);
  console.error(`Project root: ${PROJECT_ROOT}`);
  const startupScan = getScanResult();
    console.error(`Components found: ${Object.keys(startupScan.components).length}`);
  console.error(`Starting stdio transport...`);

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
