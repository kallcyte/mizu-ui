import{readFileSync as r,writeFileSync as w}from"node:fs"
const p="D:/codes/mizu-ui/src/components/docs/NavigationMenuDemo.vue"
let d=r(p,"utf8")
if(!d.includes("MizuNavigationMenuViewport")){
  d=d.replace("MizuNavigationMenuLink,\n} from \"@mizu/vue\";","MizuNavigationMenuLink,\n  MizuNavigationMenuViewport,\n} from \"@mizu/vue\";")
}
const re=/<\/MizuNavigationMenuList>\n(\s*)<\/MizuNavigationMenuRoot>/g
let res="",last=0,m
while((m=re.exec(d))!==null){
  const s=m.index,ctx=d.substring(Math.max(0,s-3000),s)
  if(ctx.includes("MizuNavigationMenuContent")&&!ctx.includes("MizuNavigationMenuViewport")){
    res+=d.substring(last,s)
    const ind=m[1]
    res+="</MizuNavigationMenuList>\n"+ind+"  <MizuNavigationMenuViewport />\n"+ind+"</MizuNavigationMenuRoot>"
    last=s+m[0].length
  }
}
if(last>0){res+=d.substring(last);w(p,res,"utf8");console.log("done",res.length)}
else console.log("no changes")
