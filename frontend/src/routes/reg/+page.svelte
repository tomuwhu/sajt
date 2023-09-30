<script>
    import sha256 from 'js-sha256'
    const serverbase = 'http://localhost:3000'
    const ml = [
        ['Felhasználónév', 'un'],
        ['Név', 'nev'],
        ['Email cím', 'mail']
    ]
    var user = {}, pw = ''
    $: user.pw = sha256(pw)
</script>
<h1>Regisztráció</h1>
<form>
    {#each ml as x}
    <input type="text" placeholder={x[0]} bind:value={user[x[1]]}>
    <br>
    <br>
    {/each}
    <input placeholder="Jelszó (min. 4 karakter)" type="password" autocomplete="new-password" bind:value={pw}>
    <br><br>
    <button 
        disabled={!(
            user.un && user.nev && pw && pw.length > 3 &&
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.mail)
        )}
        on:click={() => {
            var tosend = Object.entries(user).map(v => v.join('¨')).join('|')
            fetch(`${serverbase}/reg/${tosend}`)
                .then(v => v.text())
                .then(console.log)
        }}
    >Regisztrál</button>
</form>