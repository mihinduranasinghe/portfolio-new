import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'; 

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
 
  // Fetching from devicePixelRatio.to
  li:any; //Response article list

  article_count:any;
  page_count:any;
  item_per_page=8;

  page_count_array:any;  
  item_indexes_array:any;
  item_indexes_restructured_array:any;

  constructor(private http : HttpClient) {}

  ngOnInit(): void {
   this.http.get('https://dev.to/api/articles?username=mihinduranasinghe') 
    .subscribe(Response => {  
      console.log(Response) 
      this.li=Response; 
      this.article_count=this.li.length;
      this.page_count=Math.ceil(this.article_count/this.item_per_page);

      this.page_count_array = Array(this.page_count).fill(0).map((x,i)=>i);
      this.item_indexes_array= Array(this.article_count).fill(0).map((x,i)=>i);

      var result = [];
        for (var i = 0; i < this.item_indexes_array.length; i+=this.item_per_page) {
          // result.push([this.item_indexes_array[i], this.item_indexes_array[i+1], this.item_indexes_array[i+2], this.item_indexes_array[i+3]]); //Adds i and i+1 as a new array to the result array
          result.push([this.li[this.item_indexes_array[i]],this.li[this.item_indexes_array[i+1]],this.li[this.item_indexes_array[i+2]],this.li[this.item_indexes_array[i+3]],this.li[this.item_indexes_array[i+4]],this.li[this.item_indexes_array[i+5]],this.li[this.item_indexes_array[i+6]],this.li[this.item_indexes_array[i+7]] ]); //Adds i and i+1 as a new array to the result array
        }
      this.item_indexes_restructured_array=result;

      console.log(this.item_indexes_array);
      console.log(this.page_count_array);
      console.log(this.item_indexes_restructured_array)
    }); 
      
  }

  

}
