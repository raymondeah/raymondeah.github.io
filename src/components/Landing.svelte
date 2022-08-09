<script>
    import Email from "./icons/Email.svelte";
    import Github from "./icons/Github.svelte";
    import LinkedIn from "./icons/LinkedIn.svelte";

    let active = false;
    let toggle = false;
    function handleClick() {
        active = !active
        toggle = !toggle
    }
</script>

<section>
    <header>
        <nav>
            <ul class:active class="nav-links">
                <li><a on:click={handleClick} href="#about">about</a></li>
                <li><a on:click={handleClick} href="#projects">projects</a></li>
                <li><a on:click={handleClick} href="#contact">contact</a></li>
                <li><a href="Eah_Raymond.pdf" target="_blank">resume</a></li>
                <li>
                    <div class="socials">
                        <a href="https://github.com/raymondeah" target="_blank">
                            <div class="icon">
                                <Github />
                            </div>
                        </a>           
                        <a href="mailto:eah.r@northeastern.edu" target="_blank">
                            <div class="icon">
                                <Email />
                            </div>
                        </a>
                        <a href="https://linkedin.com/in/raymondeah" target="_blank">
                            <div class="icon li">
                                <LinkedIn />
                            </div>
                        </a>
                    </div>
                </li>
            </ul>

            <div on:click={handleClick} class:toggle class="burger">
                <div class="line-1"></div>
                <div class="line-2"></div>
                <div class="line-3"></div>
            </div>
        </nav>  
    </header>
    
    <div class="landing">
        <div class="temp">
            <p class="big intro">Hi, I'm</p>
            <p class="big name">Raymond Eah</p>
            <p class="small">A student and developer interested in front end and full stack development.</p>
        </div>
    </div>
</section>

<style>
    section {
        width: 100%;
        height: 100%;
        background-color: rgb(12, 12, 12);
        color:white;
        position: relative;
        user-select: none;
    }

    a {
        text-decoration: none;
        color: rgb(200, 200, 200);
        font-weight: 600;
    }

    a:hover {
        color:white;
    }
    
    .big {
        font-size: 3rem;
        font-weight: 800;
    }

    @media (min-width: 480px) {
        .big {
            font-size: 6rem;
        }
    }

    .small {
        font-size: 1.4rem;
        margin-top: 0.5rem;
        color: rgb(150, 150, 150);
    }

    .intro {
        color: rgb(150, 150, 150);
    }

    nav {
        height: 5rem;
        display: flex;
        justify-content: right;
    }

    .nav-links {
        width: 75%;
        height: calc(100% - 4px);
        background-color: rgb(12, 12, 12);
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 3rem;
        font-size: 1.2rem;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.4s ease-in;
        border: 2px solid white;
        border-right: none;
        user-select: none;
    }
    
    .active {
        transform: translateX(0%);
    }

    .nav-links li {
        list-style: none;
    }

    .socials {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }

    .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2rem;
        height: 2rem;
        fill: white;
    }

    .burger {
        display: block;
        cursor: pointer;
        padding: 0.5rem;
        user-select: none;
    }

    .burger div {
        width: 32px;
        width: 2rem;
        height: 4px;
        margin: 7px;
        background-color: white;
        transition: all 0.3s ease;
    }

    @media (min-width: 768px) {
        .nav-links {
            width: initial;
            height: 5rem;
            flex-direction: row;
            transform: translateX(0%);
            transition: none;
            border: none;
        }

        .nav-links .socials {
            display: none;
        }

        .burger {
            display: none;
        }        
    }

    .toggle .line-1 {
        transform: rotate(-45deg) translate(-7px, 8px);
    }
    .toggle .line-2 {
        opacity: 0;
    }
    .toggle .line-3 {
        transform: rotate(45deg) translate(-7px, -8px);
    }

    .landing {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: left;
        margin: 0 auto;
        width: 90%;
        height: calc(100% - 10rem);
    }

    @media (min-width: 480px) {
        .landing {
            width: calc(100% - 2rem);
            height: calc(100% - 9rem);
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>