function decimal(locale = 'en-US') {
    return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
}

export default decimal;
