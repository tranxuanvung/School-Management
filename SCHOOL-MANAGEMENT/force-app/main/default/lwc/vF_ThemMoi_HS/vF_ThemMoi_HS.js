import { LightningElement, track} from 'lwc';
import LightningAlert from 'lightning/alert';
import getClassData from '@salesforce/apex/getClassDataController.getClassData';
import addNewStudent from '@salesforce/apex/addNewStudentController.addNewStudent';

export default class VF_ThemMoi_HS extends LightningElement {
    // lưu giá trị id và name của các class để truyền vào filed select lớp
    dataClass

    // Lưu giá trị mặc định của id class đầu tiên
    idClass

    // Lưu giá trị các trường dữ liệu thêm mới học sinh
    @track dataChange = {firstname: null, lastname: null, gender: false, birthday: null, classId: null}

    // Lấy giá trị thông tin các lớp
    connectedCallback(){
        getClassData().then(res => {
            this.dataClass = res;
            this.idClass = res[0].Id;
            console.log(res);
        }).catch(error => {
            console.log(error);
        })
    }

    // Cập nhật thông tin các trường của thêm mới học sinh khi người dùng điền
    handleChange(event){
        const field = event.target.name;
        if(field === 'firstname'){
            this.dataChange.firstname = event.target.value;
        }
        if(field === 'lastname'){
            this.dataChange.lastname = event.target.value;
        }
        if(field === 'gender'){
            this.dataChange.gender = event.target.checked;
        }
        if(field === 'birthday'){
            this.dataChange.birthday = event.target.value;
        }
        if(field === 'classId'){
            this.dataChange.classId = event.target.value;
        }
    }

    // Xử lý sự kiện khi nhấn nút lưu
    handleSave(event){
        if(this.dataChange.firstname == null || this.dataChange.lastname == null || this.dataChange.birthday == null){
            LightningAlert.open({
                message: "Chưa nhập đầy đủ thông tin",
                theme: "error",
                label: "Thông báo lỗi"
            });
        }else if(!this.convertAndCheckDate(this.dataChange.birthday).check){
            LightningAlert.open({
                message: "Tuổi của học sinh không nằm trong khoảng từ 6 đến 18 tuổi",
                theme: "error",
                label: "Thông báo lỗi"
            });
        }else{
            let id;
            if(this.dataChange.classId == null){
                id = this.idClass;
            }else{
                id = this.dataChange.classId;
            }
            // console.log(id);
            addNewStudent({firstName: this.dataChange.firstname, lastName: this.dataChange.lastname, gender: this.dataChange.gender, birthday: this.convertAndCheckDate(this.dataChange.birthday).date, classId: id}).then(res => {
                if(res != null){
                    LightningAlert.open({
                        message: "Thêm học sinh thành công",
                        theme: "success",
                        label: "Thông báo"
                    }).then(res => {
                        window.location.href = '/lightning/page/home';
                    })
                }
            }).catch(error => {
                console.log(error);
                LightningAlert.open({
                    message: "Đã có lỗi trong quá trinhf xử lý",
                    theme: "error",
                    label: "Thông báo lỗi"
                }).then(res => {
                    window.location.href = '/lightning/page/home';
                })
            })
        }
    }

    // convert date về dạng 'yyyy-mm-dd' và check xem tuổi của học sinh có đủ điều kiện >= 6 và <= 18 hay không?
    convertAndCheckDate(date){
        if(date !== ''){
            let temp;
            let day = '';
            let month = '';
            let year = '';
            let start = 0;
            let end = 0;
            let status = 0;
            for(let i = 0; i < date.length; i++){
                if(date[i] == '/'){
                if(status == 0){
                    start = i;
                    status ++;
                }else{
                    end = i;
                    break;
                }
                }
            }
            day = date.substring(0,start);
            month = date.substring(start+1,end);
            year = date.substring(end+1);
            
            const today = new Date();
            let age = parseInt(today.getFullYear()) - parseInt(year);
            if(parseInt(today.getMonth()) < parseInt(month)){
                age--;
            }else if(parseInt(today.getMonth()) == parseInt(month)){
                if(parseInt(today.getDate()) < parseInt(day)){
                    age--;
                }
            }
            if(age >= 6 && age <= 18){
                temp = true;
            }else{
                temp = false;
            }

            if(day.length < 2) day = '0' + day;
            if(month.length < 2) month = '0' + month;
            // console.log('Tuoi cua hoc sinh la ' + age--);
            return {date: (year + '-' + month + '-' + day), check: temp};
        }
    }
}