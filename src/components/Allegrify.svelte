<script>
    import Github from './icons/Github.svelte'
    import Link from './icons/Link.svelte'

    let mobile = false;
</script>

<section id="projects">
    <div class="card">
        <div class="content">
            <div class="desc">
                <div class="title">
                    <p><b>Allegrify</b></p>
                    <div class="icons">
                        <a class="icon" href="" target="_blank">
                            <Link />
                        </a>
                        <a class="icon" href="https://github.com/raymondeah/allegrify" target="_blank">
                            <Github />
                        </a>
                    </div>
                </div>
                <div class="summary">
                    <p>Using the "swipe" concept pioneered by Tinder, I built a music discovery service for Spotify users. Users can quickly find new songs by swiping through short snippets of personalized recommendations. Recommendations are highly customizable, and liked songs can be added to a new playlist.</p>
                    <p><b>Technologies:</b> Vue/TypeScript, Flask/Python</p>
                </div>
            </div>
        
            <div class="mobile-img">
                <img src="images/allegro_sc_mobile.png" alt="">
            </div>
            <div class="flapper">
                <div class="desktop-img">
                    <!-- <img src="images/rumble_sc.png" alt=""> -->
                    <img src="images/allegro_sc_mobile.png" alt="">
                </div>  
                <div class="desktop-img">
                    <!-- <img src="images/rumble_sc.png" alt=""> -->
                    <img src="images/allegro_sc_mobile.png" alt="">
                </div> 
                <div class="desktop-img">
                    <!-- <img src="images/rumble_sc.png" alt=""> -->
                    <img src="images/allegro_sc_mobile.png" alt="">
                </div>  
            </div>
        </div>
    </div>
</section>

<style>
    section {
        background-color: rgb(12, 12, 12);
        color: white;
        padding-top: 3rem;
        padding-bottom: 3rem;
        display: flex;
        flex-direction: column;
        gap: 3rem;
        justify-content: center;
        align-items: center;
        /* font-size: 24px; */
    }

    .card {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.5rem;
        background-color: rgb(32, 32, 32);
        width: min(96%, 60rem);
    }

    .content {
        /* border: 2px solid red; */
        display: flex;
        flex-direction: column;
        width: min(calc(100% - 2rem), 58rem);
        padding: 1rem;
        /* margin: 1rem 0; */
        gap: 1rem;
    }

    @media (min-width: 480px) {
        .content {
            padding: 1.5rem;
            gap: 1.5rem;
        }
    }

    @media (min-width: 768px) {
        .content {
            padding: 2rem 2rem;
            gap: 2rem;
        }
    }

    .desc {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        /* padding: 0 2px; */
    }

    @media (min-width: 768px) {
        .desc {
            /* gap: 2rem; */
        }
    }

    .icons {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        width: 4rem;
    }

    @media (min-width: 768px) {
        .icons {
            /* width: 100%; */
        }
    }

    .icon {
        color: rgb(230, 230, 230);
        fill: rgb(230, 230, 230);
        width: 1.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title {
        /* border: 2px solid red; */
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 0.5rem;
        font-size: 1.6rem;
    }

    @media (min-width: 768px) {
        .title {
            /* flex-direction: column;
            justify-content: left; */
            gap: 1rem;
        }
    }

    .summary {
        color: rgb(180, 180, 180);
        display: flex;
        flex-direction: column;
        gap: 1rem;
        font-size: 1.1rem;
    }

    @media(min-width: 480px) {
        .summary {
            font-size: 1.1rem;
        }
    }

    .desktop-img {
        display: none;
    }

    @media (min-width: 480px) {
        .desktop-img {
            display: flex;
            width: 30%;
            justify-content: center;
            align-items: center;
            background-color: rgba(128, 128, 128, 0.5);
            border-radius: 0.5rem;
            padding: 0.4rem;
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
        width: 100%;
        border-radius: 0.5rem;
        /* display: block; */
        /* max-width: 100%; */
    }

    .flapper {
        display: flex;
        justify-content: space-between;
        /* border: 2px solid red; */
    }
</style>
