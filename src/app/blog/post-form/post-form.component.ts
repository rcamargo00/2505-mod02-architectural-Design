import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post, PostService } from '../post.service';
@Component({
  selector: 'app-post-form',
  standalone:false,
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  postForm: FormGroup;
  isEditMode: boolean = false;
  postId: number | null = null;
  formTitle: string = 'Crear Nueva Publicación';
  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', [Validators.required, Validators.minLength(20)]],
      author: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.postId = +id;
        this.formTitle = 'Editar Publicación';
        this.postService.getPostById(this.postId).subscribe(post => {
          if (post) {
            this.postForm.patchValue(post); // Populate form with existing data
          } else {
            console.warn(`Post with ID ${this.postId} not found for editing.`);
            this.router.navigate(['/blog/new']); // Redirect to new if not found
          }
        });
      }
    });
  }
  onSubmit(): void {
    if (this.postForm.valid) {
      const { title, content, author } = this.postForm.value;
      if (this.isEditMode && this.postId !== null) {
        const updatedPost: Post = {
          id: this.postId,
          title,
          content,
          author,
          date: new Date() // Keep original date or update as needed
        };
        this.postService.updatePost(updatedPost).subscribe(() => {
          console.log('Post updated successfully!');
          this.router.navigate(['/blog', this.postId]);
        });
      } else {
        this.postService.addPost(title, content, author).subscribe(newPost => {
          console.log('Post added successfully!', newPost);
          this.router.navigate(['/blog', newPost.id]);
        });
      }
    }
  }
  goBack(): void {
    this.router.navigate(['/blog']);
  }
}
