import { Component, OnInit } from '@angular/core';
import { Favorite, Movie, MovieService } from 'src/app/services/movie.service';
import { tap } from 'rxjs';
import { map } from 'rxjs';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  movies: Movie[] = []
  favorite: Partial<Favorite> = {
    userId: 0,
    movieId: 0
  }

  user!: {
    id: number,
    email: string
  }

  like: boolean [] = [];

  favorites: Favorite[] = [];
  userFavorites: Favorite[] = [];

  constructor(private movieSrv: MovieService) { }

  ngOnInit(): void {

    if (this.user) {
    this.user = JSON.parse(localStorage.getItem('UserData')!)
    // this.movieSrv.getMovies().pipe(map(data => this.movies = data));
    this.printMovies();
    // this.userId = JSON.parse(localStorage.getItem("userData")!)
    }

  }

  printMovies() {
    this.movieSrv.getMovies().pipe(tap(ris => {
      this.movies = ris;
      this.movies.forEach(e=>{(e.like = false), console.log(e.like)});
    })).subscribe();
    this.movieSrv.getFav().pipe(map(data => {
        this.favorites = data;
    }));
    let j = 0;
    this.favorites.forEach((f) => {
      if (f.userId == this.user.id){
        this.userFavorites[j] = f;
        j++
      }
    })
  }


  addFav(idMovie: number) {


    ;
    if(this.user){
    this.favorite = { userId: this.user.id, movieId: idMovie }
    this.movieSrv.setFav(this.favorite)
    console.log("sono user",this.user);
  }}


  toggleFav(idMovie: number){

  this.movies.map((e)=>{
    if(e.id == idMovie) e.like = !e.like;
    if (e.like) {this.addFav(idMovie)}
    else this.movieSrv.cancFav;
  })
  }

  // toggleFav(idMovie:number){
  //   this.like[idMovie] = !this.like[idMovie];
  //   console.log(this.like);

  // }

}
