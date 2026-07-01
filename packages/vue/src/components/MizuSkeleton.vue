<script lang="ts">
import type{InjectionKey}from"vue"
export interface SkeletonThemeProps{
  width?:string|number;height?:string|number;radius?:string|number
  baseColor?:string;highlightColor?:string
  animationDuration?:number;animationDirection?:"normal"|"reverse"
  enableAnimation?:boolean;customHighlightBackground?:string
}
export const SKELETON_THEME_KEY:InjectionKey<SkeletonThemeProps>=Symbol("mizu-skeleton-theme")
export interface SkeletonProps extends SkeletonThemeProps{
  variant?:"text"|"circle"|"rect"
  animation?:"shimmer"|"pulse"|"none"
  lines?:number;loading?:boolean
}
</script>
<script setup lang="ts">
import{computed,useAttrs,inject}from"vue"

const props=withDefaults(defineProps<SkeletonProps>(),{
  variant:"text",animation:"shimmer",lines:1,
  loading:undefined,width:undefined,height:undefined,
  radius:undefined,baseColor:undefined,highlightColor:undefined,
  animationDuration:undefined,animationDirection:undefined,
  enableAnimation:undefined,customHighlightBackground:undefined
})
const attrs=useAttrs()
const slots=defineSlots<{default:()=>unknown}>()
const theme=inject(SKELETON_THEME_KEY,{})
function sv(v:string|number|undefined):string|undefined{
  if(v==null)return undefined;return typeof v==="number"?v+"px":v
}
function px(v:string|number|undefined):string|undefined{return sv(v)}
function r<K extends keyof SkeletonThemeProps>(k:K):SkeletonThemeProps[K]|undefined{
  if(props[k]!==undefined)return props[k];return(theme as any)[k]
}
const showContent=computed(()=>{
  if(props.loading!==undefined)return!props.loading
  if(slots.default)return(slots.default()as any[]).some((v:any)=>typeof v?.children==="string"&&v.children.length>0)
  return false
})
const cvStyle=computed(():Record<string,string>=>{
  const s:Record<string,string>={}
  const w=r("width");if(w!=null)s.width=px(w)!
  const h=r("height");if(h!=null)s.height=px(h)!
  const rd=r("radius");if(rd!=null)s.borderRadius=px(rd)!
  const bc=r("baseColor");if(bc)s["--mizu-skeleton-base"]=bc
  const hc=r("highlightColor");if(hc)s["--mizu-skeleton-highlight"]=hc
  const dur=r("animationDuration");if(dur!=null)s["--mizu-animation-duration"]=dur+"s"
  const dir=r("animationDirection");if(dir)s["--mizu-animation-direction"]=dir
  const ea=r("enableAnimation");if(ea===false)s["--mizu-animation-display"]="none"
  const cbg=r("customHighlightBackground");if(cbg)s["--mizu-skeleton-custom-gradient"]=cbg
  if(props.radius!=null)s.borderRadius=px(props.radius)!
  return s
})
const skCls=computed(()=>{
  const c=["mizu-skeleton","mizu-skeleton--"+props.variant]
  if(props.animation!=="none")c.push("mizu-skeleton--"+props.animation)
  if(attrs.class)c.push(attrs.class as string)
  return c.join(" ")
})
const wrCls=computed(()=>{
  const c=["mizu-skeleton-stack"];if(attrs.class)c.push(attrs.class as string);return c.join(" ")
})
function stkSty(i:number,t:number):Record<string,string>{
  return{...cvStyle.value,width:i<t-1
    ?(r("width")!=null?px(r("width")!)!:"100%"):"60%"}
}
</script>

<template>
  <slot v-if="showContent"/>
  <div v-else-if="variant==='text'&&lines>1":class="wrCls"aria-hidden="true">
    <span v-for="i in lines":key="i":class="skCls":style="stkSty(i-1,lines)"/>
  </div>
  <span v-else:class="skCls":style="cvStyle"aria-hidden="true"/>
</template>

<style>
@reference "../index.css";
.mizu-skeleton{display:block;background-color:var(--mizu-skeleton-base,#e5e7eb);border-radius:var(--radius-default,6px)}
[data-theme="dark"] .mizu-skeleton{background-color:var(--mizu-skeleton-base,#1f2937)}
.mizu-skeleton--text{height:.85em;max-width:100%;border-radius:var(--radius-default,6px)}
.mizu-skeleton--circle{aspect-ratio:1;border-radius:9999px}
.mizu-skeleton--rect{border-radius:var(--radius-default,6px)}
.mizu-skeleton--shimmer{position:relative;overflow:hidden}
.mizu-skeleton--shimmer::after{
  content:"";display:var(--mizu-animation-display,block);
  position:absolute;inset:0;height:100%;
  background-image:var(--mizu-skeleton-custom-gradient,
    linear-gradient(90deg,
      var(--mizu-skeleton-base,#e5e7eb) 0%,
      var(--mizu-skeleton-highlight,#f9fafb) 50%,
      var(--mizu-skeleton-base,#e5e7eb) 100%
    ));
  background-repeat:no-repeat;transform:translateX(-100%);
  animation:mizu-skeleton-shimmer var(--mizu-animation-duration,1.5s) ease-in-out infinite;
  animation-direction:var(--mizu-animation-direction,normal);
}
[data-theme="dark"] .mizu-skeleton--shimmer::after{
  background-image:var(--mizu-skeleton-custom-gradient,
    linear-gradient(90deg,
      var(--mizu-skeleton-base,#1f2937) 0%,
      var(--mizu-skeleton-highlight,#374151) 50%,
      var(--mizu-skeleton-base,#1f2937) 100%
    ));
}
@keyframes mizu-skeleton-shimmer{100%{transform:translateX(100%)}}
.mizu-skeleton--pulse{animation:mizu-skeleton-pulse 2s cubic-bezier(.4,0,.6,1) infinite}
@keyframes mizu-skeleton-pulse{0%,100%{opacity:1}50%{opacity:.5}}
.mizu-skeleton-stack{@apply flex flex-col;gap:.5em}
.mizu-skeleton-stack>.mizu-skeleton--text{@apply max-w-full}
@media(prefers-reduced-motion:reduce){
  .mizu-skeleton--shimmer::after,.mizu-skeleton--pulse{animation:none}
  .mizu-skeleton--shimmer::after{display:none}
  .mizu-skeleton--shimmer,.mizu-skeleton--pulse{opacity:.7}
}
</style>
