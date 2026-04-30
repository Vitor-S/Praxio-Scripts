function addStyles() {
     GM_addStyle(`
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css');
    `)

    GM_addStyle(`
        .active-toast {
            opacity: 1 !important;
            top: 50px !important;
        }`
    );

    GM_addStyle(`
        #toast::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 2px;
            background-color: #000;
        }`
    );
}