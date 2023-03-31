import { LightningElement, wire } from 'lwc';
import getHocSinh from '@salesforce/apex/tableController.getHocSinh';
export default class VF_TimKiem extends LightningElement {
    @wire(getHocSinh)
    hocsinhHandler({data, error}){
        if(data){
            console.log(data);
        }else{
            console.error(error);
        }
    }
}