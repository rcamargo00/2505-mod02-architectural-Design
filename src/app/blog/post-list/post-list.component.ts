import { Component, OnInit } from '@angular/core';
import { Post, PostService } from '../post.service'; // Import Post and PostService
import { Router } from '@angular/router';
@Component({
  selector: 'app-post-list',
  standalone:false,
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  constructor(private postService: PostService) { } // Inject PostService
  ngOnInit(): void {
    this.loadPosts();
  }
  loadPosts(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }
  editPost(post: Post): void {
    console.log('Edit post:', post);
    // Implement navigation to an edit form
  }
  deletePost(id: number): void {
    this.postService.deletePost(id).subscribe(success => {
      if (success) {
        this.loadPosts(); // Reload posts after deletion
      }
    });
  }
  Inicio(){
    
  }
}