<script>
    import Email from "./icons/Email.svelte";
    import Github from "./icons/Github.svelte";
    import LinkedIn from "./icons/LinkedIn.svelte";
</script>

<section id="contact">
    <div class="container">
        <div class="left">
            <h2>Get in touch</h2>
            <p class="desc">I'm looking for internship opportunities for Winter 2023 and Summer 2023. If you think I'm a good fit, shoot me an email! Regardless, my inbox is always open, so don't be afraid to reach out!</p>
        </div>
        <div class="right">
            <a href="Eah_Raymond.pdf" target="_blank">
                <div class="resume">
                    Resume
                </div>
            </a>
            
            <div class="icons">
                <a href="https://github.com/raymondeah" target="_blank">
                    <div class="icon-container">
                        <div class="icon">
                            <Github />
                        </div>
                    </div>
                </a>           
                <a href="mailto:eah.r@northeastern.edu" target="_blank">
                    <div class="icon-container">
                        <div class="icon">
                            <Email />
                        </div>
                    </div>
                </a>
                <a href="https://linkedin.com/in/raymondeah" target="_blank">
                    <div class="icon-container">
                        <div class="icon li">
                            <LinkedIn />
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</section>

<style>
    section {
        background-color: rgb(32, 32, 32);
        color: rgb(200, 200, 200);
        display: flex;
        justify-content: center;
        padding: 6rem 1rem;
    }

    a {
        text-decoration: none;
        font-weight: bold;
        color: white;
    }

    .container {
        width: min(96%, 60rem);
        /* border: 2px solid red; */
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        gap: 2rem;
    }

    @media(min-width: 768px) {
        .container {
            flex-direction: row;
        }
    }

    .left {
        /* border: 2px solid red; */
        /* width: 50%; */
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    @media(min-width: 768px) {
        .left {
            align-items: flex-start;
            width: 60%;
        }
    }

    .resume {
        height: 3.5rem;
        /* border: 2px solid red; */
        /* background-color: rgb(51, 51, 51); */
        border: 1px solid white;
        font-size: 1.1rem;
        border-radius: 0.5em;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .resume:hover {
        color: rgb(180, 180, 180);
        border: 1px solid rgb(180, 180, 180);
    }

    .icons {
        height: 3.5rem;
        /* border: 2px solid white; */
        /* border-radius: 0.5em; */
        display: flex;
        justify-content: space-between;
    }

    .icon-container {
        width: 5rem;
        height: 3.5rem;
        border: 1px solid white;
        border-radius: 0.5em;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .icon-container:hover {
        border: 1px solid rgb(180, 180, 180);
    }

    .icon-container:hover .icon {
        fill:rgb(180, 180, 180);
        color: rgb(180, 180, 180);
    }

    .icon {
        width: 1.6rem;
        height: 1.6rem;
        fill: white;
    }
    
    .li {
        width: 1.5rem;
        height: 1.5rem;
    }

    .right {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    @media(min-width: 768px) {
        .right {
            width: 30%;
        }
    }

    .desc {
        font-size: 1.1rem;
    }
</style>