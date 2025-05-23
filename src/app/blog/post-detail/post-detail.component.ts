import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post, PostService } from '../post.service';
@Component({
  selector: 'app-post-detail',
  standalone:false,
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: Post | undefined;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const postId = Number(params.get('id'));
      if (postId) {
        this.postService.getPostById(postId).subscribe(post => {
          this.post = post;
          if (!this.post) {
            console.warn(`Post with ID ${postId} not found.`);
            this.router.navigate(['/blog']);
          }
        });
      }
    });
  }
  editPost(): void {
    if (this.post) {
      this.router.navigate(['/blog/edit', this.post.id]);
    }
  }
  deletePost(): void {
    if (this.post) {
      this.postService.deletePost(this.post.id).subscribe(success => {
        if (success) {
          console.log(`Post ${this.post?.id} deleted.`);
          this.router.navigate(['/blog']);
        }
      });
    }
  }
  goBack(): void {
    this.router.navigate(['/blog']);
  }
}