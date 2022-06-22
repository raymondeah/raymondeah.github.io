<script>
    import Caret from './Caret.svelte'
    import Hamburger from './Hamburger.svelte'
</script>

<div class="main-page">
    <div class="landing">
        <h1>RAYMOND EAH</h1>
        <h3>STUDENT | DEVELOPER</h3>
    </div>

    <div class="hamburger-container">
        <Hamburger />
    </div>

    <a href="#about" class="caret-container">
        <Caret />
    </a>
</div>

<style>
    .main-page {
        width: 100%;
        height: 100%;
        /* background-color: #1f1137; */
        background-color: rgb(36, 36, 36);
        color:white;
        user-select: none;
    }

    .landing {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size: 4rem;
        gap: 40px;
        width: 100%;
        height: 100%;
        /* border: 5px solid red; */
    }

    .hamburger-container {
        position: absolute;
        right: 12px;
        top: 12px;
    }

    .caret-container {
        /* border: 2px solid red; */
        position: absolute;
        right: 12px;
        bottom: 4px;
    }
</style>