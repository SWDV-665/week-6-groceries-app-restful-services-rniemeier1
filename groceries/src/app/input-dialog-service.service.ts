import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { GroceriesServiceService } from './groceries-service.service';

@Injectable({
  providedIn: 'root'
})
export class InputDialogServiceService {

  constructor(public alertCtrl: AlertController, public toastCtrl: ToastController, public DataService: GroceriesServiceService) { }


  async showPrompt(item?, index?){
    const prompt = this.alertCtrl.create({
      header: item ? "Edit Item" : "Add Item",
      message: item ? "Please edit the item and quantity as needed." : "Please enter the item name and quantity.",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: item ? item.name : null
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: item ? item.quantity : null
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel Clicked');
          }
        },
        {
          text: 'Save',
          handler: async item => {
            if(index !== undefined){
              //edit item
              this.DataService.editItem(item, index);
              const toast = this.toastCtrl.create({
                message: 'Updated ' + item.name,
                duration: 3000
              });
              (await (toast)).present();
            }
            else{
              //add item
              this.DataService.addItem(item);
            const toast = this.toastCtrl.create({
              message: 'Added ' + item.name,
              duration: 3000
            });
            (await (toast)).present();
            }
          }
        }
      ]
     });
    (await prompt).present();
  }
}
