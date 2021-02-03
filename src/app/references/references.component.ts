import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
// import { Subscription } from 'rxjs';



@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.css']
})
export class ReferencesComponent {
  
  recommendations$:any;
  recommendations:any[]=[];
  recommendations_count:any;
  result : any[]=[];

  specific_rec_objects_array:any;
  specific_rec_object:any;
  // recommendations$:FirebaseListObservable<any[]>;
  recommendation$:any;

  path:String | any;
  image_name:any;
  image_url:any;
  default_avatar="https://firebasestorage.googleapis.com/v0/b/portfolio-c8a74.appspot.com/o/default_avatar.jpg?alt=media&token=aed2e21b-0ca6-4aa9-b8cd-b2aa80b16bbf";
  
  constructor(private db: AngularFireDatabase, private af : AngularFireStorage ) { 
    this.recommendations$ = db.list('/recommendations').valueChanges();
    this.recommendation$ = db.object('/recommendations/0').valueChanges();
    this.recommendations_count = this.recommendations.length;

     
     for (var i = 0; i < this.recommendations_count; i+=1) {
          this.result.push(i); //Adds i and i+1 as a new array to the result array
     }

    db.list('/recommendations').valueChanges().subscribe(recommendations=>{
      this.recommendations=recommendations;
      console.log(this.recommendations);
    });

  
  }

  getSpecificRecommendation(email:any){
    //iterate over recommendations$ and get the exact object
    this.specific_rec_objects_array = this.recommendations.filter(function(rec) {
       return rec.email == email;
    });
  }

  add(recommendation:any){
      // add(recommendation:HTMLInputElement){
      // this.recommendations$.push(recommendation.value);
      // recommendation.value = '';
    console.log(recommendation);
    return this.db.list('/recommendations').push({
      // name: recommendation,
      name: recommendation.name,
      email:recommendation.email,
      designation:recommendation.designation,
      organization: recommendation.organization,
      recommendation:recommendation.recommendation_note,
      avatar:this.image_url,
    })
    .then(x=>{
      console.log("Created");
      alert("Thank you very much! Your Recommendation Successfully Added. It will be displayed on the recommendations slider");
      window.location.reload();
    });
  }

  update(specific_rec_object:any, recommendation:any){
    // return this.db.object('recommendations/'+recommendation.$key).update({
    return this.db.object('recommendations/'+ specific_rec_object.$key).update({
      name: recommendation.name,
      email:recommendation.email,
      designation:recommendation.designation,
      organization: recommendation.organization,
      recommendation:recommendation.recommendation_note,
      avatar:this.image_url,
    })
    .then(x=>{
      console.log("Updated");
      alert("Thank you very much! Your Recommendation Successfully Edited. It will be displayed on the recommendations slider");
      window.location.reload();
      // window.location.href = 'http://www.mihinduranasinghe.com';
    });
  }

  delete(id:any){
    this.db.object('recommendations/'+id)
      .remove()
      .then(x=>{
      console.log("Deleted");
      alert("Thank you very much! Your Recommendation Successfully Added. It will be displayed on the recommendations slider");
      window.location.reload();
    });
  }

  async submit(recommendation:any) {
    console.log(recommendation);
    if(this.path){
      await this.uploadImage(); //Upload image to firebase
      await this.getImageUrl(); //Retrieve image url from firebase after uploading
    }else{
       this.image_url=this.default_avatar;
    }

    // setTimeout(() => {  this.getImageUrl(); }, 8000);

    let email = recommendation.email;
    this.getSpecificRecommendation(email);
    let specific_objects_array = this.specific_rec_objects_array
    let specific_rec_object = specific_objects_array[0];
    // console.log(this.specific_rec_objects_array);
    // console.log(specific_rec_object);
    // console.log(id)
    
    if(specific_rec_object){
      await this.update(specific_rec_object,recommendation);
    }else{
      await this.add(recommendation);
    }
    // this.delete(id)

    

  }


 // Image Upload
  selectImage($event:any){
    this.path = $event.target.files[0];
    var path = this.path;
    this.image_name = path.name;
    // console.log(this.path);
    console.log(this.image_name);
  }

  uploadImage(){  
    console.log(this.path);
    return this.af.upload(this.image_name, this.path); 
  }

  getImageUrl(){
    return this.af.storage.ref(this.image_name).getDownloadURL()
      .then((url)=>{
        // console.log(url);
        this.image_url=url;
      })
  }


}
