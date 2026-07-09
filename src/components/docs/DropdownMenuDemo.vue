<script setup lang="ts">
import { ref } from "vue";
import {
  Check,
  User,
  CreditCard,
  Settings,
  Keyboard,
  LogOut,
  Trash2,
  Pencil,
  Share,
  Plus,
  Copy,
  Undo2,
  Redo2,
} from "@lucide/vue";
import {
  MizuDropdownMenuRoot,
  MizuDropdownMenuTrigger,
  MizuDropdownMenuPortal,
  MizuDropdownMenuContent,
  MizuDropdownMenuItem,
  MizuDropdownMenuGroup,
  MizuDropdownMenuLabel,
  MizuDropdownMenuCheckboxItem,
  MizuDropdownMenuItemIndicator,
  MizuDropdownMenuRadioGroup,
  MizuDropdownMenuRadioItem,
  MizuDropdownMenuSeparator,
  MizuDropdownMenuSub,
  MizuDropdownMenuSubTrigger,
  MizuDropdownMenuSubContent,
  MizuDropdownMenuShortcut,
  MizuButton,
} from "@mizu/vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const bookmarksChecked = ref(true);
const urlsChecked = ref(false);
const fullnameChecked = ref(false);
const notificationsChecked = ref(true);

const fileFormat = ref("json");
const paymentMethod = ref("card");

const basicCode = `<MizuDropdownMenuRoot>
  <MizuDropdownMenuTrigger as-child>
    <MizuButton variant="outline" size="md" class="w-max">Open Menu</MizuButton>
  </MizuDropdownMenuTrigger>
  <MizuDropdownMenuPortal>
    <MizuDropdownMenuContent>
      <MizuDropdownMenuItem @select="() => console.log('New Tab')">
        New Tab
        <MizuDropdownMenuShortcut>⌘T</MizuDropdownMenuShortcut>
      </MizuDropdownMenuItem>
      <MizuDropdownMenuItem @select="() => console.log('New Window')">
        New Window
        <MizuDropdownMenuShortcut>⌘N</MizuDropdownMenuShortcut>
      </MizuDropdownMenuItem>
      <MizuDropdownMenuItem disabled>
        Print
        <MizuDropdownMenuShortcut>⌘P</MizuDropdownMenuShortcut>
      </MizuDropdownMenuItem>
      <MizuDropdownMenuSeparator />
      <MizuDropdownMenuItem @select="() => console.log('Downloads')">Downloads</MizuDropdownMenuItem>
    </MizuDropdownMenuContent>
  </MizuDropdownMenuPortal>
</MizuDropdownMenuRoot>`;

const iconsCode = `<MizuDropdownMenuRoot>
  <MizuDropdownMenuTrigger as-child>
    <MizuButton variant="outline" size="md" class="w-max">My Account</MizuButton>
  </MizuDropdownMenuTrigger>
  <MizuDropdownMenuPortal>
    <MizuDropdownMenuContent>
      <MizuDropdownMenuLabel>My Account</MizuDropdownMenuLabel>
      <MizuDropdownMenuSeparator />
      <MizuDropdownMenuGroup>
        <MizuDropdownMenuItem @select="() => console.log('Profile')">
          <User :size="16" />
          Profile
          <MizuDropdownMenuShortcut>⇧⌘P</MizuDropdownMenuShortcut>
        </MizuDropdownMenuItem>
        <MizuDropdownMenuItem @select="() => console.log('Billing')">
          <CreditCard :size="16" />
          Billing
          <MizuDropdownMenuShortcut>⌘B</MizuDropdownMenuShortcut>
        </MizuDropdownMenuItem>
        <MizuDropdownMenuItem @select="() => console.log('Settings')">
          <Settings :size="16" />
          Settings
          <MizuDropdownMenuShortcut>⌘,</MizuDropdownMenuShortcut>
        </MizuDropdownMenuItem>
        <MizuDropdownMenuItem @select="() => console.log('Keyboard shortcuts')">
          <Keyboard :size="16" />
          Keyboard shortcuts
        </MizuDropdownMenuItem>
      </MizuDropdownMenuGroup>
      <MizuDropdownMenuSeparator />
      <MizuDropdownMenuItem @select="() => console.log('Log out')">
        <LogOut :size="16" />
        Log out
        <MizuDropdownMenuShortcut>⇧⌘Q</MizuDropdownMenuShortcut>
      </MizuDropdownMenuItem>
    </MizuDropdownMenuContent>
  </MizuDropdownMenuPortal>
</MizuDropdownMenuRoot>`;

const checkboxesCode = `<MizuDropdownMenuRoot>
  <MizuDropdownMenuTrigger as-child>
    <MizuButton variant="outline" size="md" class="w-max">Notifications</MizuButton>
  </MizuDropdownMenuTrigger>
  <MizuDropdownMenuPortal>
    <MizuDropdownMenuContent>
      <MizuDropdownMenuLabel>Appearance</MizuDropdownMenuLabel>
      <MizuDropdownMenuSeparator />
      <MizuDropdownMenuCheckboxItem v-model="bookmarksChecked">
        <MizuDropdownMenuItemIndicator>
          <Check :size="14" />
        </MizuDropdownMenuItemIndicator>
        Include Bookmarks
      </MizuDropdownMenuCheckboxItem>
      <MizuDropdownMenuCheckboxItem v-model="urlsChecked">
        <MizuDropdownMenuItemIndicator>
          <Check :size="14" />
        </MizuDropdownMenuItemIndicator>
        Include URLs
      </MizuDropdownMenuCheckboxItem>
      <MizuDropdownMenuCheckboxItem v-model="fullnameChecked">
        <MizuDropdownMenuItemIndicator>
          <Check :size="14" />
        </MizuDropdownMenuItemIndicator>
        Include Full Name
      </MizuDropdownMenuCheckboxItem>
      <MizuDropdownMenuSeparator />
      <MizuDropdownMenuCheckboxItem v-model="notificationsChecked">
        <MizuDropdownMenuItemIndicator>
          <Check :size="14" />
        </MizuDropdownMenuItemIndicator>
        Notifications
      </MizuDropdownMenuCheckboxItem>
    </MizuDropdownMenuContent>
  </MizuDropdownMenuPortal>
</MizuDropdownMenuRoot>`;

const radioGroupCode = `<MizuDropdownMenuRoot>
  <MizuDropdownMenuTrigger as-child>
    <MizuButton variant="outline" size="md" class="w-max">File Options</MizuButton>
  </MizuDropdownMenuTrigger>
  <MizuDropdownMenuPortal>
    <MizuDropdownMenuContent>
      <MizuDropdownMenuLabel>File Format</MizuDropdownMenuLabel>
      <MizuDropdownMenuRadioGroup v-model="fileFormat">
        <MizuDropdownMenuRadioItem value="json">
          <MizuDropdownMenuItemIndicator>
            <Check :size="14" />
          </MizuDropdownMenuItemIndicator>
          JSON
        </MizuDropdownMenuRadioItem>
        <MizuDropdownMenuRadioItem value="csv">
          <MizuDropdownMenuItemIndicator>
            <Check :size="14" />
          </MizuDropdownMenuItemIndicator>
          CSV
        </MizuDropdownMenuRadioItem>
        <MizuDropdownMenuRadioItem value="xml">
          <MizuDropdownMenuItemIndicator>
            <Check :size="14" />
          </MizuDropdownMenuItemIndicator>
          XML
        </MizuDropdownMenuRadioItem>
      </MizuDropdownMenuRadioGroup>
      <MizuDropdownMenuSeparator />
      <MizuDropdownMenuSub>
        <MizuDropdownMenuSubTrigger>More Options</MizuDropdownMenuSubTrigger>
        <MizuDropdownMenuPortal>
          <MizuDropdownMenuSubContent>
            <MizuDropdownMenuItem @select="() => console.log('Compress')">Compress</MizuDropdownMenuItem>
            <MizuDropdownMenuItem @select="() => console.log('Encrypt')">Encrypt</MizuDropdownMenuItem>
          </MizuDropdownMenuSubContent>
        </MizuDropdownMenuPortal>
      </MizuDropdownMenuSub>
    </MizuDropdownMenuContent>
  </MizuDropdownMenuPortal>
</MizuDropdownMenuRoot>`;

const destructiveCode = `<MizuDropdownMenuRoot>
  <MizuDropdownMenuTrigger as-child>
    <MizuButton variant="outline" size="md" class="w-max">Actions</MizuButton>
  </MizuDropdownMenuTrigger>
  <MizuDropdownMenuPortal>
    <MizuDropdownMenuContent>
      <MizuDropdownMenuItem @select="() => console.log('Edit')">
        <Pencil :size="16" />
        Edit
      </MizuDropdownMenuItem>
      <MizuDropdownMenuItem @select="() => console.log('Duplicate')">
        <Copy :size="16" />
        Duplicate
      </MizuDropdownMenuItem>
      <MizuDropdownMenuSeparator />
      <MizuDropdownMenuItem @select="() => console.log('Archive')">
        <Undo2 :size="16" />
        Archive
      </MizuDropdownMenuItem>
      <MizuDropdownMenuItem @select="() => console.log('More')">
        <Redo2 :size="16" />
        More
      </MizuDropdownMenuItem>
      <MizuDropdownMenuSeparator />
      <MizuDropdownMenuItem @select="() => console.log('Share')">
        <Share :size="16" />
        Share
        <MizuDropdownMenuShortcut>⌘S</MizuDropdownMenuShortcut>
      </MizuDropdownMenuItem>
      <MizuDropdownMenuSeparator />
      <MizuDropdownMenuItem @select="() => console.log('Delete')" variant="destructive">
        <Trash2 :size="16" />
        Delete
        <MizuDropdownMenuShortcut>⌘⌫</MizuDropdownMenuShortcut>
      </MizuDropdownMenuItem>
    </MizuDropdownMenuContent>
  </MizuDropdownMenuPortal>
</MizuDropdownMenuRoot>`;

const complexCode = `<MizuDropdownMenuRoot>
  <MizuDropdownMenuTrigger as-child>
    <MizuButton variant="outline" size="md" class="w-max">Complex Menu</MizuButton>
  </MizuDropdownMenuTrigger>
  <MizuDropdownMenuPortal>
    <MizuDropdownMenuContent>
      <MizuDropdownMenuLabel>My Account</MizuDropdownMenuLabel>
      <MizuDropdownMenuSeparator />
      <MizuDropdownMenuGroup>
        <MizuDropdownMenuItem @select="() => console.log('Profile')">
          <User :size="16" />
          Profile
        </MizuDropdownMenuItem>
        <MizuDropdownMenuItem @select="() => console.log('Billing')">
          <CreditCard :size="16" />
          Billing
        </MizuDropdownMenuItem>
        <MizuDropdownMenuItem @select="() => console.log('Settings')">
          <Settings :size="16" />
          Settings
        </MizuDropdownMenuItem>
      </MizuDropdownMenuGroup>
      <MizuDropdownMenuSeparator />
      <MizuDropdownMenuGroup>
        <MizuDropdownMenuLabel>Appearance</MizuDropdownMenuLabel>
        <MizuDropdownMenuCheckboxItem v-model="bookmarksChecked">
          <MizuDropdownMenuItemIndicator>
            <Check :size="14" />
          </MizuDropdownMenuItemIndicator>
          Include Bookmarks
        </MizuDropdownMenuCheckboxItem>
        <MizuDropdownMenuCheckboxItem v-model="notificationsChecked">
          <MizuDropdownMenuItemIndicator>
            <Check :size="14" />
          </MizuDropdownMenuItemIndicator>
          Notifications
        </MizuDropdownMenuCheckboxItem>
      </MizuDropdownMenuGroup>
      <MizuDropdownMenuSeparator />
      <MizuDropdownMenuGroup>
        <MizuDropdownMenuLabel>Payment Method</MizuDropdownMenuLabel>
        <MizuDropdownMenuRadioGroup v-model="paymentMethod">
          <MizuDropdownMenuRadioItem value="card">
            <MizuDropdownMenuItemIndicator>
              <Check :size="14" />
            </MizuDropdownMenuItemIndicator>
            Card
          </MizuDropdownMenuRadioItem>
          <MizuDropdownMenuRadioItem value="paypal">
            <MizuDropdownMenuItemIndicator>
              <Check :size="14" />
            </MizuDropdownMenuItemIndicator>
            PayPal
          </MizuDropdownMenuRadioItem>
          <MizuDropdownMenuRadioItem value="applepay">
            <MizuDropdownMenuItemIndicator>
              <Check :size="14" />
            </MizuDropdownMenuItemIndicator>
            Apple Pay
          </MizuDropdownMenuRadioItem>
        </MizuDropdownMenuRadioGroup>
      </MizuDropdownMenuGroup>
      <MizuDropdownMenuSeparator />
      <MizuDropdownMenuSub>
        <MizuDropdownMenuSubTrigger>More Options</MizuDropdownMenuSubTrigger>
        <MizuDropdownMenuPortal>
          <MizuDropdownMenuSubContent>
            <MizuDropdownMenuItem @select="() => console.log('Compress')">
              Compress
              <MizuDropdownMenuShortcut>⌘C</MizuDropdownMenuShortcut>
            </MizuDropdownMenuItem>
            <MizuDropdownMenuItem @select="() => console.log('Encrypt')">
              Encrypt
            </MizuDropdownMenuItem>
          </MizuDropdownMenuSubContent>
        </MizuDropdownMenuPortal>
      </MizuDropdownMenuSub>
      <MizuDropdownMenuSeparator />
      <MizuDropdownMenuItem @select="() => console.log('Log out')">
        <LogOut :size="16" />
        Log out
      </MizuDropdownMenuItem>
    </MizuDropdownMenuContent>
  </MizuDropdownMenuPortal>
</MizuDropdownMenuRoot>`;
</script>

<template>
  <div class="dropdown-menu-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="basicCode">
        <MizuDropdownMenuRoot>
          <MizuDropdownMenuTrigger as-child>
            <MizuButton variant="outline" size="md" class="w-max">Open Menu</MizuButton>
          </MizuDropdownMenuTrigger>
          <MizuDropdownMenuPortal>
            <MizuDropdownMenuContent>
              <MizuDropdownMenuItem @select="() => console.log('New Tab')">
                New Tab
                <MizuDropdownMenuShortcut>⌘T</MizuDropdownMenuShortcut>
              </MizuDropdownMenuItem>
              <MizuDropdownMenuItem @select="() => console.log('New Window')">
                New Window
                <MizuDropdownMenuShortcut>⌘N</MizuDropdownMenuShortcut>
              </MizuDropdownMenuItem>
              <MizuDropdownMenuItem disabled>
                Print
                <MizuDropdownMenuShortcut>⌘P</MizuDropdownMenuShortcut>
              </MizuDropdownMenuItem>
              <MizuDropdownMenuSeparator />
              <MizuDropdownMenuItem @select="() => console.log('Downloads')"
                >Downloads</MizuDropdownMenuItem
              >
            </MizuDropdownMenuContent>
          </MizuDropdownMenuPortal>
        </MizuDropdownMenuRoot>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Icons</h3>
      <CodeCollapsible :code="iconsCode">
        <MizuDropdownMenuRoot>
          <MizuDropdownMenuTrigger as-child>
            <MizuButton variant="outline" size="md" class="w-max">My Account</MizuButton>
          </MizuDropdownMenuTrigger>
          <MizuDropdownMenuPortal>
            <MizuDropdownMenuContent>
              <MizuDropdownMenuLabel>My Account</MizuDropdownMenuLabel>
              <MizuDropdownMenuSeparator />
              <MizuDropdownMenuGroup>
                <MizuDropdownMenuItem @select="() => console.log('Profile')">
                  <User :size="16" />
                  Profile
                  <MizuDropdownMenuShortcut>⇧⌘P</MizuDropdownMenuShortcut>
                </MizuDropdownMenuItem>
                <MizuDropdownMenuItem @select="() => console.log('Billing')">
                  <CreditCard :size="16" />
                  Billing
                  <MizuDropdownMenuShortcut>⌘B</MizuDropdownMenuShortcut>
                </MizuDropdownMenuItem>
                <MizuDropdownMenuItem @select="() => console.log('Settings')">
                  <Settings :size="16" />
                  Settings
                  <MizuDropdownMenuShortcut>⌘,</MizuDropdownMenuShortcut>
                </MizuDropdownMenuItem>
                <MizuDropdownMenuItem @select="() => console.log('Keyboard shortcuts')">
                  <Keyboard :size="16" />
                  Keyboard shortcuts
                </MizuDropdownMenuItem>
              </MizuDropdownMenuGroup>
              <MizuDropdownMenuSeparator />
              <MizuDropdownMenuItem @select="() => console.log('Log out')">
                <LogOut :size="16" />
                Log out
                <MizuDropdownMenuShortcut>⇧⌘Q</MizuDropdownMenuShortcut>
              </MizuDropdownMenuItem>
            </MizuDropdownMenuContent>
          </MizuDropdownMenuPortal>
        </MizuDropdownMenuRoot>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Checkboxes</h3>
      <CodeCollapsible :code="checkboxesCode">
        <MizuDropdownMenuRoot>
          <MizuDropdownMenuTrigger as-child>
            <MizuButton variant="outline" size="md" class="w-max">Notifications</MizuButton>
          </MizuDropdownMenuTrigger>
          <MizuDropdownMenuPortal>
            <MizuDropdownMenuContent>
              <MizuDropdownMenuLabel>Appearance</MizuDropdownMenuLabel>
              <MizuDropdownMenuSeparator />
              <MizuDropdownMenuCheckboxItem v-model="bookmarksChecked">
                <MizuDropdownMenuItemIndicator>
                  <Check :size="14" />
                </MizuDropdownMenuItemIndicator>
                Include Bookmarks
              </MizuDropdownMenuCheckboxItem>
              <MizuDropdownMenuCheckboxItem v-model="urlsChecked">
                <MizuDropdownMenuItemIndicator>
                  <Check :size="14" />
                </MizuDropdownMenuItemIndicator>
                Include URLs
              </MizuDropdownMenuCheckboxItem>
              <MizuDropdownMenuCheckboxItem v-model="fullnameChecked">
                <MizuDropdownMenuItemIndicator>
                  <Check :size="14" />
                </MizuDropdownMenuItemIndicator>
                Include Full Name
              </MizuDropdownMenuCheckboxItem>
              <MizuDropdownMenuSeparator />
              <MizuDropdownMenuCheckboxItem v-model="notificationsChecked">
                <MizuDropdownMenuItemIndicator>
                  <Check :size="14" />
                </MizuDropdownMenuItemIndicator>
                Notifications
              </MizuDropdownMenuCheckboxItem>
            </MizuDropdownMenuContent>
          </MizuDropdownMenuPortal>
        </MizuDropdownMenuRoot>
        <p class="demo-hint">
          Bookmarks: {{ bookmarksChecked }}, URLs: {{ urlsChecked }}, Full Name:
          {{ fullnameChecked }}, Notifications: {{ notificationsChecked }}
        </p>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Radio Group</h3>
      <CodeCollapsible :code="radioGroupCode">
        <MizuDropdownMenuRoot>
          <MizuDropdownMenuTrigger as-child>
            <MizuButton variant="outline" size="md" class="w-max">File Options</MizuButton>
          </MizuDropdownMenuTrigger>
          <MizuDropdownMenuPortal>
            <MizuDropdownMenuContent>
              <MizuDropdownMenuLabel>File Format</MizuDropdownMenuLabel>
              <MizuDropdownMenuRadioGroup v-model="fileFormat">
                <MizuDropdownMenuRadioItem value="json">
                  <MizuDropdownMenuItemIndicator>
                    <Check :size="14" />
                  </MizuDropdownMenuItemIndicator>
                  JSON
                </MizuDropdownMenuRadioItem>
                <MizuDropdownMenuRadioItem value="csv">
                  <MizuDropdownMenuItemIndicator>
                    <Check :size="14" />
                  </MizuDropdownMenuItemIndicator>
                  CSV
                </MizuDropdownMenuRadioItem>
                <MizuDropdownMenuRadioItem value="xml">
                  <MizuDropdownMenuItemIndicator>
                    <Check :size="14" />
                  </MizuDropdownMenuItemIndicator>
                  XML
                </MizuDropdownMenuRadioItem>
              </MizuDropdownMenuRadioGroup>
              <MizuDropdownMenuSeparator />
              <MizuDropdownMenuSub>
                <MizuDropdownMenuSubTrigger>More Options</MizuDropdownMenuSubTrigger>
                <MizuDropdownMenuPortal>
                  <MizuDropdownMenuSubContent>
                    <MizuDropdownMenuItem @select="() => console.log('Compress')"
                      >Compress</MizuDropdownMenuItem
                    >
                    <MizuDropdownMenuItem @select="() => console.log('Encrypt')"
                      >Encrypt</MizuDropdownMenuItem
                    >
                  </MizuDropdownMenuSubContent>
                </MizuDropdownMenuPortal>
              </MizuDropdownMenuSub>
            </MizuDropdownMenuContent>
          </MizuDropdownMenuPortal>
        </MizuDropdownMenuRoot>
        <p class="demo-hint">Format: {{ fileFormat }}</p>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Destructive</h3>
      <CodeCollapsible :code="destructiveCode">
        <MizuDropdownMenuRoot>
          <MizuDropdownMenuTrigger as-child>
            <MizuButton variant="outline" size="md" class="w-max">Actions</MizuButton>
          </MizuDropdownMenuTrigger>
          <MizuDropdownMenuPortal>
            <MizuDropdownMenuContent>
              <MizuDropdownMenuItem @select="() => console.log('Edit')">
                <Pencil :size="16" />
                Edit
              </MizuDropdownMenuItem>
              <MizuDropdownMenuItem @select="() => console.log('Duplicate')">
                <Copy :size="16" />
                Duplicate
              </MizuDropdownMenuItem>
              <MizuDropdownMenuSeparator />
              <MizuDropdownMenuItem @select="() => console.log('Archive')">
                <Undo2 :size="16" />
                Archive
              </MizuDropdownMenuItem>
              <MizuDropdownMenuItem @select="() => console.log('More')">
                <Redo2 :size="16" />
                More
              </MizuDropdownMenuItem>
              <MizuDropdownMenuSeparator />
              <MizuDropdownMenuItem @select="() => console.log('Share')">
                <Share :size="16" />
                Share
                <MizuDropdownMenuShortcut>⌘S</MizuDropdownMenuShortcut>
              </MizuDropdownMenuItem>
              <MizuDropdownMenuSeparator />
              <MizuDropdownMenuItem variant="destructive" @select="() => console.log('Delete')">
                <Trash2 :size="16" />
                Delete
                <MizuDropdownMenuShortcut>⌘⌫</MizuDropdownMenuShortcut>
              </MizuDropdownMenuItem>
            </MizuDropdownMenuContent>
          </MizuDropdownMenuPortal>
        </MizuDropdownMenuRoot>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Complex</h3>
      <CodeCollapsible :code="complexCode">
        <MizuDropdownMenuRoot>
          <MizuDropdownMenuTrigger as-child>
            <MizuButton variant="outline" size="md" class="w-max">Complex Menu</MizuButton>
          </MizuDropdownMenuTrigger>
          <MizuDropdownMenuPortal>
            <MizuDropdownMenuContent>
              <MizuDropdownMenuLabel>My Account</MizuDropdownMenuLabel>
              <MizuDropdownMenuSeparator />
              <MizuDropdownMenuGroup>
                <MizuDropdownMenuItem @select="() => console.log('Profile')">
                  <User :size="16" />
                  Profile
                </MizuDropdownMenuItem>
                <MizuDropdownMenuItem @select="() => console.log('Billing')">
                  <CreditCard :size="16" />
                  Billing
                </MizuDropdownMenuItem>
                <MizuDropdownMenuItem @select="() => console.log('Settings')">
                  <Settings :size="16" />
                  Settings
                </MizuDropdownMenuItem>
              </MizuDropdownMenuGroup>
              <MizuDropdownMenuSeparator />
              <MizuDropdownMenuGroup>
                <MizuDropdownMenuLabel>Appearance</MizuDropdownMenuLabel>
                <MizuDropdownMenuCheckboxItem v-model="bookmarksChecked">
                  <MizuDropdownMenuItemIndicator>
                    <Check :size="14" />
                  </MizuDropdownMenuItemIndicator>
                  Include Bookmarks
                </MizuDropdownMenuCheckboxItem>
                <MizuDropdownMenuCheckboxItem v-model="notificationsChecked">
                  <MizuDropdownMenuItemIndicator>
                    <Check :size="14" />
                  </MizuDropdownMenuItemIndicator>
                  Notifications
                </MizuDropdownMenuCheckboxItem>
              </MizuDropdownMenuGroup>
              <MizuDropdownMenuSeparator />
              <MizuDropdownMenuGroup>
                <MizuDropdownMenuLabel>Payment Method</MizuDropdownMenuLabel>
                <MizuDropdownMenuRadioGroup v-model="paymentMethod">
                  <MizuDropdownMenuRadioItem value="card">
                    <MizuDropdownMenuItemIndicator>
                      <Check :size="14" />
                    </MizuDropdownMenuItemIndicator>
                    Card
                  </MizuDropdownMenuRadioItem>
                  <MizuDropdownMenuRadioItem value="paypal">
                    <MizuDropdownMenuItemIndicator>
                      <Check :size="14" />
                    </MizuDropdownMenuItemIndicator>
                    PayPal
                  </MizuDropdownMenuRadioItem>
                  <MizuDropdownMenuRadioItem value="applepay">
                    <MizuDropdownMenuItemIndicator>
                      <Check :size="14" />
                    </MizuDropdownMenuItemIndicator>
                    Apple Pay
                  </MizuDropdownMenuRadioItem>
                </MizuDropdownMenuRadioGroup>
              </MizuDropdownMenuGroup>
              <MizuDropdownMenuSeparator />
              <MizuDropdownMenuSub>
                <MizuDropdownMenuSubTrigger>More Options</MizuDropdownMenuSubTrigger>
                <MizuDropdownMenuPortal>
                  <MizuDropdownMenuSubContent>
                    <MizuDropdownMenuItem @select="() => console.log('Compress')">
                      Compress
                      <MizuDropdownMenuShortcut>⌘C</MizuDropdownMenuShortcut>
                    </MizuDropdownMenuItem>
                    <MizuDropdownMenuItem @select="() => console.log('Encrypt')">
                      Encrypt
                    </MizuDropdownMenuItem>
                  </MizuDropdownMenuSubContent>
                </MizuDropdownMenuPortal>
              </MizuDropdownMenuSub>
              <MizuDropdownMenuSeparator />
              <MizuDropdownMenuItem @select="() => console.log('Log out')">
                <LogOut :size="16" />
                Log out
              </MizuDropdownMenuItem>
            </MizuDropdownMenuContent>
          </MizuDropdownMenuPortal>
        </MizuDropdownMenuRoot>
        <p class="demo-hint">Payment: {{ paymentMethod }}</p>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.dropdown-menu-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}
.dropdown-menu-examples :deep(*) {
  margin: 0;
}
.example-section {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.example-section h3 {
  all: revert;
  font-size: 14px;
  font-weight: 600;
  color: var(--sl-color-text);
  margin: 0;
}

/* Component-specific styles */
.demo-hint {
  all: revert;
  font-size: 12px;
  color: var(--sl-color-text) !important;
  margin: 0;
}
</style>
