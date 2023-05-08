<section id="about" class="about">
    <div class="container">
        <div class="left">
            <h2>About Me</h2>
    
            <p>
            Hi! I'm Raymond (Ray) Eah and I'm a third-year student at Northeastern University studying 
            Computer Science.
            </p>

            <p>
            I'm passionate about building robust and scalable projects that deliver great user experiences. I'm always eager to learn and grow, both personally and professionally. Currently I've got some cool projects in the works!
            </p>

            <p>
            In my free time, I enjoy playing volleyball, cooking, and fitness.
            </p>
        </div>
        <div class="right">
            <img src="images/wave.png" alt="">
        </div> 
    </div>
</section>

<style>
    section {
        background-color: rgb(32, 32, 32);
        display: flex;
        justify-content: center;
        color: rgb(180, 180, 180);
        font-size: 1.1rem;
        gap: 1rem;
        padding: 6rem 1rem;
    }

    a {
        text-decoration: none;
    }
    
    .container {
        display: flex;
        width: min(96%, 60rem);
        /* gap: 1rem; */
    }

    .left {
        /* border: 2px solid red; */
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
    }

    @media (min-width: 768px) {
        .left {
            width: 70%;
        }
    }

    .right {
        display: none;
        /* border: 2px solid red; */
    }

    @media (min-width: 768px) {
        .right {
            display: flex;
            justify-content: right;
            align-items: center;
            /* border: 2px solid blue; */
            width: 30%;
        }
    }

    img {
        width: 12em;
        height: 12rem;
    }

    h2 {
        color: white;
    }
</style>