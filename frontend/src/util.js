export default {
    formatPhoneNumber: function (phone) {
        return phone.substring(0,3)+"-"+phone.substring(3,6)+"-"+phone.substring(6,11)
    },

    getSum: function (data) {
        if(data.length > 0) {
            return data.reduce((a,v) =>  a = a + v, 0) / data.length;
        }
    }
}
