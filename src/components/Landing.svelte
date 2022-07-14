<script>
    import Hamburger from './icons/Hamburger.svelte'
</script>

<section>
    <div class="nav">
        <a href="#about">about</a>
        <a href="#projects">projects</a>
        <a href="#contact">contact</a>
        <a href="Eah_Raymond.pdf" target="_blank">resume</a>
    </div>
    
    <div class="landing">
        <div class="temp">
            <p class="big intro">Hi, I'm</p>
            <p class="big name">Raymond Eah</p>
            <p class="small">A student and developer interested in front end and full stack development.</p>
        </div>
    </div>
    
    <!-- <a href="#about" class="caret-container">
        <Caret />
    </a> -->
</section>

<style>
    section {
        width: 100%;
        height: 100%;
        background-color: rgb(12, 12, 12);
        color:white;
        user-select: none;
    }

    a {
        text-decoration: none;
        color: white;
        font-weight: 600;
    }

    a:hover {
        color:rgb(200, 200, 200)
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
        /* border: 2px solid red; */
        /* width: 75%; */
    }

    .intro {
        color: rgb(150, 150, 150);
    }

    .name {
        color: white;
    }

    .nav {
        display: none;
    }

    @media (min-width: 480px) {
        .nav {
            height: 5rem;
            display: flex;
            justify-content: right;
            align-items: center;
            font-size: 1.1rem;
            gap: 2.5rem;
            margin-right: 2.5rem;
        }
    }

    .landing {
        /* border: 2px solid red; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: left;
        margin: 0 auto;
        /* gap: 2rem; */
        width: 90%;
        height: 100%
        /* border: 5px solid red; */
    }

    @media (min-width: 480px) {
        .landing {
            /* border: 2px solid red; */
            width: calc(100% - 2rem);
            height: calc(100% - 9rem);
            /* margin: 0 1rem; */
            /* padding-bottom: 0rem; */
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    /* @media (min-width: 1024px) {
	    .landing {
	        gap: 4rem;
	    }
    } */
</style>