import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPetModalComponent } from '../pet-profile/add-pet-modal.component';
import { PetDetailModalComponent } from '../pet-profile/pet-detail-modal.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PetProfileService } from '../pet-profile/pet-profile.service';
import { CalendarComponent } from '../calendar/calendar.component';
import { CalendarService } from '../calendar/calendar.service';
import { PetProfile } from '../pet-profile/pet-profile.model';
import { ImageService } from '../image-gallery/image.service';
// import { error } from 'console';
// import { PetProfileComponent } from '../pet-profile/pet-profile.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  initializePetProfile() {
    //    this.petName.pets = this.pets
       }
  
  currentImageIndex = 0;
  pets: any[] = [];
  imageUrls: any[] = [];
  events: any[] = [];


  constructor(private modalService:NgbModal,
     private http:HttpClient, 
     public petProfileService: PetProfileService,
     private router:Router,
     private imageService: ImageService,
  ) { }

  ngOnInit(): void {
    this.fetchEventsFromServer();
    this.fetchPetsFromServer();
    this.imageService.getImages().subscribe(
      (data) => {
        this.imageUrls = data;
      },
      (error) => {
        console.error('Error fetching images', error);
      }
    );
  }

  nextImage() {
    if (this.currentImageIndex < this.imageUrls.length - 1) {
      this.currentImageIndex++;
    }
  }

  previousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  openPetDetailModal(pet: PetProfile) {
    const modalRef = this.modalService.open(PetDetailModalComponent);
    modalRef.componentInstance.petName = pet.petName;
    modalRef.componentInstance.petType = pet.petType;
    modalRef.componentInstance.petBreed = pet.petBreed;
    modalRef.componentInstance.petAge = pet.petAge;
    modalRef.componentInstance.petWeight = pet.petWeight;
    modalRef.componentInstance.petBirthdate = pet.petBirthdate;
    modalRef.componentInstance.petMedication = pet.petMedication;
    modalRef.componentInstance.petAllergy = pet.petAllergy;
    modalRef.componentInstance.petMicrochip = pet.petMicrochip;
    modalRef.componentInstance.petDiagnoses = pet.petDiagnoses;
  }
  
  fetchPetsFromServer() {
    this.http.get<PetProfile[]>('http://localhost:8080/api/petProfile', { params: { page: '0', size: '3' } })
      .subscribe(
        (data) => {
          // Update the pets array with the fetched data
          this.pets = [...this.pets, ...data];
          for (let pet of this.pets) {
            let petTypeString = this.petProfileService.getPetTypeString(pet.petType);
            let emoji = this.petProfileService.determineProfilePictureEmoji(petTypeString);
            pet.emoji = emoji;
          }
        },
        (error) => {
          console.error('Error fetching pets', error);
        }
      );
  }

  fetchEventsFromServer() {
    this.http.get<any[]>('http://localhost:8080/api/events', { params: { page: '0', size: '3' } })
    .subscribe(
      (data) => {
        this.events = [...this.events, ...data];
      },
      (error) => {
        console.error('Error fetching events', error);
       }
    );
}
  navigateToCalendar() {
    this.router.navigate(['/calendar']);
  }
  navigateToProfile() {
    this.router.navigate(['my-profile']);
  }
  navigateToProfessionals() {
    this.router.navigate(['care-professional']);
  }
  openAddPetModal() {
    const modalRef = this.modalService.open(AddPetModalComponent);
    modalRef.result.then((result) => {
      if (result) {
        this.petProfileService.addPet(result).subscribe(
          (response) => {
            console.log('Pet added to database:', response);
            this.pets.push(result); // Add the new pet to the local array
          },
          (error) => {
            console.error('Error adding pet:', error);
          }
        );
      }
    });
  }

}
