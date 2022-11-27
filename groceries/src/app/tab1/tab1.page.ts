import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {GroceriesServiceService} from '../groceries-service.service';
import { InputDialogServiceService } from '../input-dialog-service.service';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  //Page Title
  title = "Grocery List";

  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController, public DataService: GroceriesServiceService, public InputService: InputDialogServiceService, public socialShare: SocialSharing) {

  }

  loadItems(){
    return this.DataService.getItems();
  }

    //Remove item from items array
    async removeItem(item, index){
      const delItemName = item.name;
      this.DataService.removeItem(index);
  
      const toast = this.toastCtrl.create({
        message: 'Removed ' + delItemName + ".",
        duration: 3000
      });
      (await toast).present();
    }

   async shareItem(item, index){
       let message = "Grocery Item: " + item.name + " Quantity: " + item.quantity;
       let subject = "Shared via Groceries App";
       let response = "";
      
       try{
         this.socialShare.share(message, subject);
         response = "Shared " + item.name + " successfully.";
       }catch(e)
       {
         response = "Error sharing " + item.name + ". ";
         console.log(e);
       }

       const toast = this.toastCtrl.create({
         message: response,
         duration: 3000
      });
       (await toast).present();
      
    }
 
    editItem(item, index){
      this.InputService.showPrompt(item, index);
    }

    addItem(){
      this.InputService.showPrompt();
    }
}
