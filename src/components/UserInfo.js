export default class UserInfo {
    constructor(userSelector) {
        this._name = document.querySelector(userSelector.name);
        this._job = document.querySelector(userSelector.job);
        this._avatarProfile = document.querySelector(userSelector.avatar);
    }

    getUserInfo() {
        this._formValue = { nameValue: this._name.textContent,
                            jobValue: this._job.textContent}
        return this._formValue
    }

    setUserInfo(formValue) {
        this._name.textContent = formValue.nameValue;
        this._job.textContent = formValue.jobValue;
        this.handleAvatarUser(formValue);
    }

    handleAvatarUser(formValue) {
        this._avatarProfile.style.backgroundImage = `url(${formValue.avatar})`;
    }
}