import { LightningElement, track} from 'lwc';
import LightningAlert from 'lightning/alert';
import addNewSubject from '@salesforce/apex/addNewSubjectController.addNewSubject';
export default class VF_ThemMoi_Mon extends LightningElement {
    @track dataChange = {idStudent: null, name: null, score: 0, score15: 0, score45: 0};

    handleChange(event){
        const field = event.target.name;
        if(field === 'idStudent'){
            this.dataChange.idStudent = event.target.value;
        }
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
    
    handleSave(event){
        // console.log('aaaaaaaaaaaaaaaaaaaaa');
        if(this.dataChange.idStudent == null || this.dataChange.name == null){
            LightningAlert.open({
                message: "Chưa nhập đầy đủ thông tin",
                theme: "error",
                label: "Thông báo lỗi"
            });
        }else{
            addNewSubject({idStudent: this.dataChange.idStudent, name: this.dataChange.name, score: this.dataChange.score, score15: this.dataChange.score15, score45: this.dataChange.score45}).then(res => {
                if(res != null){
                    LightningAlert.open({
                        message: `Thêm Môn ${this.dataChange.name} cho học sinh ${this.dataChange.name} thành công`,
                        theme: "success",
                        label: "Thông báo"
                    }).then(res => {
                        window.location.href = '/lightning/page/home';
                    })
                }else{
                    LightningAlert.open({
                        message: "Đã có lỗi trong quá trình xử lý",
                        theme: "error",
                        label: "Thông báo lỗi"
                    }).then(res => {
                        window.location.href = '/lightning/page/home';
                    })
                    console.log(error);
                }
            }).catch(error => {
                LightningAlert.open({
                    message: "Đã có lỗi trong quá trình xử lý",
                    theme: "error",
                    label: "Thông báo lỗi"
                }).then(res => {
                    window.location.href = '/lightning/page/home';
                })
                console.log(error);
            })
        }
    }
}