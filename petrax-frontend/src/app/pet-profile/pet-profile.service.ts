import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PetProfile, PetType } from './pet-profile.model';


@Injectable({
  providedIn: 'root'
})

export class PetProfileService {
  private apiUrl = '/api/petProfile';
  

    constructor(private http: HttpClient) {}

getAllPets(): Observable<PetProfile[]> {
    return this.http.get<PetProfile[]>(this.apiUrl);
  }
  addPet(pet: PetProfile): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, pet);
  }
 deleteByPetId(petId: number): Observable<any> {
   const url = `${this.apiUrl}/${petId}`;
   return this.http.delete<any>(url);
 }

 getPetTypeString(petTypeNumber: number): string {
  return PetType[petTypeNumber];
}

 determineProfilePictureEmoji(petType: string): string {
  switch (petType) {
    case 'CAT':
      console.log('Selected pet type: CAT');
      return "🐈";
    case 'DOG':
      console.log('Selected pet type: DOG');
      return "🐕";
    case 'BIRD':
      console.log('Selected pet type: BIRD');
      return "🦜";
    case 'FISH':
      console.log('Selected pet type: FISH');
      return "🐠";
    case 'REPTILE':
      console.log('Selected pet type: REPTILE');
      return "🐍";
    case 'OTHER':
      console.log('Selected pet type: OTHER');
      return "❤️";
    default:
      console.log('Selected pet type: Unknown');
      return "❓"; // Default emoji
  }
}
 }


