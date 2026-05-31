// data.js
const DataManager = {
    saveDiagnosis(name) {
        localStorage.setItem('userDiagnosis', name);
    },
    getDiagnosis() {
        return localStorage.getItem('userDiagnosis') || '未選択';
    }
};
