function isPhoneValid(phones) {
    const regex = new RegExp('^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$');
    return phones.filter(p => regex.test(p.phone)).length === phones.length;
}

module.exports = {
    isPhoneValid
}