<div class="caret-container">
    <svg width="60px" height="60px" viewBox="-96 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"/></svg>
</div>

<style>
    @keyframes fadeIn {
        from { opacity: 0; }
    }

    .caret-container {
        width: 60px;
        height: 60px;
        filter: invert(1);
        cursor: pointer;
        text-align: center;
        animation: fadeIn 1s infinite alternate;
    }

    .caret-container:hover {
        filter: invert(0.6);
        animation: none;
    }
</style>
