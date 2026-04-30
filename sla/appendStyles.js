function addStyles() {
    GM_addStyle(`
        .minha-classe {
            background-color: red;
            color: white;
            font-weight: bold;
        }`
    );

    GM_addStyle(`
        .active-toast {
            display: flex !important;
            opacity: 1 !important;
            top: 80px !important;
        }`
    );
}