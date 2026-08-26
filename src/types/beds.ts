export type BedIndex =
  | {
      id: number;
      bed_number: string;
      status: "Empty";
      current_occupant: null;
    }
  | {
      id: number;
      bed_number: string;
      status: "Occupied";
      current_occupant: CurrentOccupant;
    };

interface CurrentOccupant {
  user_id: number;
  occupant_name: string;
}
