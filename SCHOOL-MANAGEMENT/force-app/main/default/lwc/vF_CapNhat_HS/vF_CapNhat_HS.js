import { LightningElement, track } from 'lwc';
import LightningAlert from 'lightning/alert';
import getStudent from '@salesforce/apex/getStudentByIdController.getStudent';
import updateStudent from '@salesforce/apex/updateStudentController.updateStudent';
import {NavigationMixin} from 'lightning/navigation';

const actions = [
    { label: 'Cập nhật', name: 'update'},
];
const COLUMNS = [
    {label:'Môn', fieldName:'Name', type:'text'},
    {label:'Điểm KT Miệng', fieldName:'Diem_15_1__c', type:'text'},
    {label:'Điểm KT 15p', fieldName:'Diem_15_2__c', type:'text'},
    {label:'Điểm KT 45p', fieldName:'Diem_1_Tiet__c', type:'text'},
    {label:'Điểm Trung Bình Môn', fieldName:'DiemTBM__c', type:'text'},
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];

export default class VF_CapNhat_HS extends NavigationMixin(LightningElement) {
    columns = COLUMNS
    studentId
    subjectData
    className
    @track dataChange = {lastname: null, firstname: null, gender: null, birthday: null};

    async connectedCallback(){
        this.studentId = localStorage.getItem("studentId");

        getStudent({studentId: this.studentId}).then(res => {
            this.subjectData = res.Mon__r;
            this.className = res.Lop__r.Name;
            const inputs = this.template.querySelectorAll(".input");
            inputs.forEach(element => {
                if(element.name == 'lastname'){
                    element.value = res.HoHocSinh__c;
                    this.dataChange.lastname = res.HoHocSinh__c;
                }
                if(element.name == 'gender'){
                    element.checked = res.GioiTinh__c;
                    this.dataChange.gender = res.GioiTinh__c;
                }
                if(element.name == 'firstname'){
                    element.value = res.Name;
                    this.dataChange.firstname = res.Name;
                }
                if(element.name == 'birthday'){
                    element.value = this.convertDate(res.NgaySinh__c.toString());
                    this.dataChange.birthday = element.value;
                }
            })
            console.log(res);
        }).catch(error => {
            console.log(error);
        });
    }

    handleChange(event){
        const field = event.target.name;
        if(field === 'lastname'){
            this.dataChange.lastname = event.target.value;
        }
        if(field === 'firstname'){
            this.dataChange.firstname = event.target.value;
        }
        if(field === 'gender'){
            this.dataChange.gender = event.target.checked;
        }
        if(field === 'birthday'){
            this.dataChange.birthday = event.target.value;
        }
    }

    handleUpdate(event){
        let checkDate;
        if(this.dataChange.lastname == null || this.dataChange.firstname == null || this.dataChange.birthday == null || this.dataChange.gender == null){
            LightningAlert.open({
                message: "Chưa nhập điều kiện tìm kiếm",
                theme: "error",
                label: "Thông báo lỗi"
            });
        }else 
        {
            checkDate = this.convertAndCheckDate(this.dataChange.birthday);
            if(!checkDate.check){
                LightningAlert.open({
                    message: "Tuổi của học sinh không nằm trong khoảng từ 6 đến 18 tuổi",
                    theme: "error",
                    label: "Thông báo lỗi"
                });
            }else{
                updateStudent({studentId: this.studentId, firstname: this.dataChange.firstname, lastname: this.dataChange.lastname, gender: this.dataChange.gender, birthday: checkDate.date}).then(res => {
                    console.log(res);
                    if(res){
                        LightningAlert.open({
                            message: "Cập nhật thông tin học sinh thành công",
                            theme: "success",
                            label: "Thông báo"
                        }).then(res => {
                            // window.location.href = '/lightning/page/home';

                            this[NavigationMixin.Navigate]({
                                type: 'standard__app',
                                attributes: {
                                    // CustomTabs from managed packages are identified by their
                                    // namespace prefix followed by two underscores followed by the
                                    // developer name. E.g. 'namespace__TabName'
                                    // appTarget: 'Student_Management'
                                }
                            });
                        })
                    }else{
                        LightningAlert.open({
                            message: "Đã có lỗi trong quá trình xử lý",
                            theme: "error",
                            label: "Thông báo lỗi"
                        }).then(res => {
                            // window.location.href = '/lightning/page/home';

                            this[NavigationMixin.Navigate]({
                                type: 'standard__app',
                                attributes: {
                                    // CustomTabs from managed packages are identified by their
                                    // namespace prefix followed by two underscores followed by the
                                    // developer name. E.g. 'namespace__TabName'
                                    // appTarget: 'Student_Management'
                                }
                            });
                        })
                    }
                }).catch(error => {
                    console.log(error);
                    LightningAlert.open({
                        message: "Đã có lỗi trong quá trình xử lý",
                        theme: "error",
                        label: "Thông báo lỗi"
                    }).then(res => {
                        // window.location.href = '/lightning/page/home';

                        this[NavigationMixin.Navigate]({
                            type: 'standard__app',
                            attributes: {
                                // CustomTabs from managed packages are identified by their
                                // namespace prefix followed by two underscores followed by the
                                // developer name. E.g. 'namespace__TabName'
                                // appTarget: 'Student_Management'
                            }
                        });
                    })
                })
            }
        }
        
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = JSON.parse(JSON.stringify(event.detail.row));
        if(actionName == 'update'){
            localStorage.setItem("subjectId", row.Id);
            // window.location.href = '/lightning/n/Update_Subject';

            this[NavigationMixin.Navigate]({
                type: 'standard__navItemPage',
                attributes: {
                    // CustomTabs from managed packages are identified by their
                    // namespace prefix followed by two underscores followed by the
                    // developer name. E.g. 'namespace__TabName'
                    apiName: 'Update_Subject'
                }
            });
        }
    }

    // Chuyển về dạng dd/mm/yyyy
    convertDate(date){
        const temp = date.toString();
        const year = temp.substring(0,4);
        const month = temp.substring(5,7);
        const day = temp.substring(8);
        return day + '/' + month + '/' + year;
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