<script>
    import Github from './icons/Github.svelte'
    import Link from './icons/Link.svelte'

    let mobile = false;
</script>

<section id="projects">
    <h2>Projects</h2>
    <div class="card">
        <div class="content">
            <div class="desc">
                <div class="title">
                    <p><b>RUMBLE</b></p>
                    <div class="icons">
                        <a href="https://wordleaot.com" target="_blank">
                            <div class="icon">
                                <Link />
                            </div>
                        </a>

                        <a href="https://github.com/raymondeah/RUMBLE" target="_blank">
                            <div class="icon">
                                <Github />
                            </div>
                        </a>
                    </div>
                </div>
                <div class="summary">
                    <p>RUMBLE is an Attack on Titan themed variant of Wordle with a limited wordbank. The puzzle resets daily, stats are tracked, and users can share their results, just like the original game. Play while you wait for Part 3!</p>
                    <p><b>Tech Stack:</b> JavaScript, HTML, CSS</p>
                </div>
            </div>
            
            <!-- {#if mobile}
                <div class="mobile-img">
                    <img src="images/rumble_sc_mobile.png" alt="">
                </div>
            {:else}
                <div class="desktop-img">
                    <img src="images/rumble_sc.png" alt="">
                </div>  
            {/if} -->
            <div class="mobile-img">
                <img src="images/rumble_sc_mobile.png" alt="">
            </div>
            <div class="desktop-img">
                <img src="images/rumble_sc.png" alt="">
            </div>  
        </div>
    </div>
</section>

<style>
    section {
        background-color: rgb(12, 12, 12);
        color: white;
        padding-top: 3rem;
        padding-bottom: 8rem;
        /* padding: 8rem 0; */
        display: flex;
        flex-direction: column;
        gap: 3rem;
        justify-content: center;
        align-items: center
    }

    a {
        color: white;
    }

    .card {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.5rem;
        background-color: rgb(32, 32, 32);
        width: min(96%, 60rem);
        color: white;
    }

    .content {
        display: flex;
        flex-direction: column;
        width: min(calc(100% - 2rem), 58rem);
        padding: 1rem;
        gap: 1rem;
        color: white;
    }

    @media (min-width: 480px) {
        .content {
            padding: 1.5rem;
            gap: 1.5rem;
        }
    }

    @media (min-width: 768px) {
        .content {
            padding: 3rem;
            gap: 3rem;
        }
    }

    .desc {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        color: white;
    }

    @media (min-width: 768px) {
        .desc {
            flex-direction: row;
            gap: 2rem;
        }
    }

    .icons {
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.4rem;
        width: 4rem;
    }

    @media (min-width: 768px) {
        .icons {
            width: 100%;
        }
    }

    .icon {
        width: 1.6rem;
        height: 1.6rem;
        fill: white;
        color: white;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: white;
        font-size: 1.8rem;
    }

    @media (min-width: 768px) {
        .title {
            flex-direction: column;
            justify-content: left;
            gap: 1rem;
        }
    }

    .summary {
        color: rgb(200, 200, 200);
        display: flex;
        flex-direction: column;
        gap: 1rem;

        font-size: 1.1rem;
    }

    @media(min-width: 480px) {
        .summary {
            font-size: 1.2rem;
        }
    }

    .desktop-img {
        display: none;
    }

    @media (min-width: 480px) {
        .desktop-img {
            display: flex;
            justify-content: center;
            /* align-items: center; */
            background-color: rgba(128, 128, 128, 0.5);
            border-radius: 0.5rem;
            padding: 0.5rem 0;
        }
    }

    .mobile-img {
        display: flex;
        justify-content: center;
        background-color: rgba(128, 128, 128, 0.5);
        border-radius: 0.5rem;
        padding: 0.5rem 0;
        /* height: 100%; */
    }

    @media (min-width: 480px) {
        .mobile-img {
            display: none;
        }
    }

    img {
        width: calc(100% - 1rem);
        border-radius: 0.5rem;
        /* display: block; */
        /* max-width: 100%; */
    }
</style>