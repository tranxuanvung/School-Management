import { LightningElement, track} from 'lwc';

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
        
    }
}