<script>
    var x, i1
    const serverbase = 'http://localhost:3000'
    const f = answ => {
        x = answ
        i1 = ''
    }
</script>
<h1>Ez a frontend</h1> 
<a href="reg">Regisztráció</a>
<a href="https://github.com/TryGhost/node-sqlite3/wiki/API" target="_blank">sqlite3 docs</a>
<br><br>
<input bind:value={i1} placeholder="megfordítandó szöveg">
<button on:click={
    ()=>fetch(`${serverbase}/be/${i1}`)
        .then(v => v.text())
        .then(f)
}>FETCH</button>
{x}