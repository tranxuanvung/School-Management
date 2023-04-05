import { LightningElement, track } from 'lwc';
import LightningAlert from 'lightning/alert';
import getSubject from '@salesforce/apex/getSubjectByIdController.getSubject';
import updateSubject from '@salesforce/apex/updateSubjectController.updateSubject';
export default class VF_CapNhat_Mon extends LightningElement {
    subjectId
    studentName
    @track dataChange = {name: null, score: 0, score15: 0, score45: 0};

    async connectedCallback(){
        this.subjectId = localStorage.getItem("subjectId");
        console.log(this.subjectId);
        getSubject({subjectId: this.subjectId}).then(res => {
            this.studentName = res.HocSinh__r.Name;
            const inputs = this.template.querySelectorAll(".input");
            inputs.forEach(element => {
                if(element.name == 'name'){
                    element.value = res.Name;
                    this.dataChange.name = res.Name;
                }
                if(element.name == 'score'){
                    element.value = res.Diem_15_1__c;
                    this.dataChange.score = res.Diem_15_1__c;
                }
                if(element.name == 'score15'){
                    element.value = res.Diem_15_2__c;
                    this.dataChange.score15 = res.Diem_15_2__c;
                }
                if(element.name == 'score45'){
                    element.value = res.Diem_1_Tiet__c;
                    this.dataChange.score45 = res.Diem_1_Tiet__c;
                }
            })
            console.log(res);
        }).catch(error => {
            console.log(error);
        });
    }

    handleChange(event){
        const field = event.target.name;
        if(field === 'name'){
            this.dataChange.name = event.target.value;
        }
        if(field === 'score'){
            this.dataChange.score = event.target.value;
        }
        if(field === 'score15'){
            this.dataChange.score15 = event.target.value;
        }
        if(field === 'score45'){
            this.dataChange.score45 = event.target.value;
        }
    }

    handleUpdate(event){
        if(this.dataChange.name == null || this.dataChange.score == null || this.dataChange.score15 == null || this.dataChange.score45 == null){
            LightningAlert.open({
                message: "Chưa nhập đầy đủ thông tin",
                theme: "error",
                label: "Thông báo lỗi"
            });
        }else{
            updateSubject({subjectId: this.subjectId, name: this.dataChange.name, score: this.dataChange.score, score15: this.dataChange.score15, score45: this.dataChange.score45}).then(res => {
                console.log('check lỗi update ' + res);
                if(res){
                    LightningAlert.open({
                        message: `Cập nhật thông tin môn học thành công`,
                        theme: "success",
                        label: "Thông báo"
                    }).then(res => {
                        window.location.href = '/lightning/n/Update_Student';
                    })
                }else{
                    LightningAlert.open({
                        message: "Đã có lỗi trong quá trình xử lý",
                        theme: "error",
                        label: "Thông báo lỗi"
                    }).then(res => {
                        window.location.href = '/lightning/n/Update_Student';
                    })
                    console.log(error);
                }
            }).catch(error => {
                LightningAlert.open({
                    message: "Đã có lỗi trong quá trình xử lý",
                    theme: "error",
                    label: "Thông báo lỗi"
                }).then(res => {
                    window.location.href = '/lightning/n/Update_Student';
                })
                console.log(error);
            })
        }
    }
}