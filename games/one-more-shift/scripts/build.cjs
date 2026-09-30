const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
let html=fs.readFileSync(path.join(root,'index.html'),'utf8');
html=html.replace('<link rel="stylesheet" href="src/style.css">',()=>'<style>'+fs.readFileSync(path.join(root,'src/style.css'),'utf8')+'</style>');
for(const name of ['engine','app'])html=html.replace(`<script src="src/${name}.js"></script>`,()=>'<script>'+fs.readFileSync(path.join(root,`src/${name}.js`),'utf8').replaceAll('</script','<\\/script')+'</script>');
fs.writeFileSync(path.join(root,'play.html'),html);
console.log('Built play.html: open directly in a browser. No server or dependencies required.');
