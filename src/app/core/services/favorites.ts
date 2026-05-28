import { Injectable, inject } from "@angular/core";
import { Firestore, doc, setDoc, deleteDoc, collection, query, where, collectionData } from "@angular/fire/firestore";
import { Observable } from "rxjs";

// Modelo del documento en Firestore.
export interface Favorite {
  userId: string;
  characterId: number;
  addedAt: Date;
}

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private firestore = inject(Firestore);

  // El id del documento combina userId + characterId para que sea unico por usuario.
  addFavorite(userId: string, characterId: number): Promise<void> {
    const ref = doc(this.firestore, `favorites/${userId}-${characterId}`);
    return setDoc(ref, {
      userId,
      characterId,
      addedAt: new Date(),
    });
  }

  // Elimina el favorito del documento correspondiente.
  removeFavorite(userId: string, characterId: number): Promise<void> {
    const ref = doc(this.firestore, `favorites/${userId}-${characterId}`);
    return deleteDoc(ref);
  }

  // Devuelve un Observable con los favoritos del usuario.
  // collectionData convierte el query de Firestore en un stream reactivo.
  getFavoritesByUser(userId: string): Observable<Favorite[]> {
    const favRef = collection(this.firestore, 'favorites');
    const q = query(favRef, where('userId', '==', userId));
    return collectionData(q) as Observable<Favorite[]>;
  }
}