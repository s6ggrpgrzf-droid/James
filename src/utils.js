async function load(k,fb){try{const v=localStorage.getItem(k);return v?JSON.parse(v):fb;}catch{return fb;}}
async function save(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch{}}

window.load = load;
window.save = save;

