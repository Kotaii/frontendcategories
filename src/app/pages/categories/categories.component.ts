import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExecuteProvisionedProductServiceActionInput } from 'aws-sdk/clients/servicecatalog';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BaseUrls } from 'src/app/base-urls';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { DbService } from 'src/app/services/db.service';
import { fileURLToPath } from 'url';
import { FileHandle } from 'src/app/models/file-handle.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  public categoryObservable: Observable<any[]> = new Observable();
  categories: Category[] = [];

  prodCategoryBool: boolean = true;
  productCategoryForm: FormGroup = new FormGroup({});
  tempFile: any;
  loader: boolean = false;
  updateBool: boolean = false;
  product: any;

  constructor(
    private fb: FormBuilder,
    private db: DbService,
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private toast: ToastrService,
    private categoriesService: CategoriesService,  
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
    //this.categoryObservable=this.categoriesService.getCategories();
    this.db.getCategories();
    this.db.categoies.subscribe((list) => {
      if(list.length !== 0) this.categories = list;
    })
     //this.categoryObservable = this.httpClient.get<any[]>("./../../assets/json/categories.json");
  }

  openProductCategoryDialog(modalRef: any, productCategoryObj: Category | null = null) {
    this.initialForm(productCategoryObj);
    this.modalService.open(modalRef);
  }

  initialForm(productCategoryObj: any = null) {
    if (productCategoryObj === null) {
      this.updateBool = false;
      this.productCategoryForm = this.fb.group({
        categoryName: ["", Validators.required],
        categoryDescription: [""],
        categoryImageUrl: ["", Validators.required],
        categoryId: [null],
        active: [1],
        addedOn: [new Date()],
      });
    } else {
      this.updateBool = true;
      this.productCategoryForm = this.fb.group({
        categoryName: [productCategoryObj.categoryName],
        categoryDescription: [productCategoryObj.categoryDescription],
        categoryImageUrl: [productCategoryObj.categoryImageUrl],
        categoryId: [productCategoryObj.categoryId],
        active: [productCategoryObj.active],
        addedOn: [productCategoryObj.addedOn]
      });
    }
  }

  checkFileType(event: any) {
    this.tempFile = event.target.files[0];
    if (
      this.tempFile.type == "image/png" ||
      this.tempFile.type == "image/jpeg" ||
      this.tempFile.type == "image/jpg"
    ) {
      // console.log("File Ok");
    } else {
      // console.log("File not Ok");
      this.tempFile = null;
       this.toast.show("Only .png/.jpeg/.jpg file format accepted!!");
    }
  }

  saveCategories() {
    this.loader = true;
    let values = { ...this.productCategoryForm.value };
    let formData = new FormData();

    Object.entries(values).forEach(([key, value]: [string, any], idx) => formData.append(key, value));
    if(!this.updateBool) formData.delete('categoryId');

    let httpRef;
    if(!this.updateBool) {
      httpRef = this.httpClient.post(BaseUrls.getAddUrl(BaseUrls.CATEGORIES_GROUPURL), formData)
    } else {
      httpRef = this.httpClient.post(BaseUrls.getUpdateUrl(BaseUrls.CATEGORIES_GROUPURL), formData)
    }

    httpRef.subscribe({
      next: (value) => {
        this.loader = false;
        this.db.getCategories();
        this.modalService.dismissAll();
        this.toast.success(`${this.updateBool ? 'Updated' : 'Added'} Successfully`, "Product Category");
      },
      error: (error) => { 
        // console.log(error);
        this.toast.warning("Something went wrong!! Please Try Again...", "Failed");
        this.loader = false;
      }
    })
  }
    

   

      // addProduct(productForm: NgForm) {
      //   const productFormData =this.prepareFormData(this.product);

      //   this.productService.addProduct(productFormData).subscribe(
      //     (response: Product) => {
      //       productFormData.reset();

      //     },
      //     (erro: HttpErrorResponse) =>{
      //       console.log(error);
      //     }
      //   );
      // }
      // }

     prepareFormData(product: any) : FormData {
      const formData = new FormData();

      formData.append(
        'product',
        new Blob([JSON.stringify(product)], {type: 'application/json'})

      );
     
      for (var i= 0; i < product.productImages.length; i++) {
        formData.append(
          'imageFile',
          product.productImages[i].file,
          product.productImages[i].file.name
        );
      }
      
      return formData;
    
    }
      
     onFileSelected(event:any) {
        if(event.target.files) {
           const file = event.target.files[0];

           const fileHandle: FileHandle = {
            file: file,
            url:  this.sanitizer.bypassSecurityTrustUrl(
              window.URL.createObjectURL(file)
            )
          }
             this.product.productImages.push(fileHandle); 
        
        }
       }
  
       deleteCategory(id: any, idx: number) {
    this.httpClient.get(`${BaseUrls.getDeleteUrl(BaseUrls.CATEGORIES_GROUPURL)}/${id}`)
      .subscribe({
        next: (value) => {
          this.categories.splice(idx, 1);
          this.toast.success(`Product Category with ${id}`, 'Deleted Successfully');
        }, 
        error: (error) => {
          this.toast.warning("Something went wrong!! Please Try Again...", "Failed");
        }
      })
  }

}
