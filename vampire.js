class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    }
    return false;
  }

  // Returns the closest common ancestor of two vampires.
  closestCommonAncestor(vampire) {
    let currentVampire1 = this;
    const lineage1 = [];
    while (currentVampire1) {
      lineage1.push(currentVampire1);
      currentVampire1 = currentVampire1.creator;
    }
    let currentVampire2 = vampire;
    const lineage2 = [];
    while (currentVampire2) {
      lineage2.push(currentVampire2);
      currentVampire2 = currentVampire2.creator;
    }

    lineage1.reverse();
    lineage2.reverse();

    const minLength = Math.min(lineage1.length, lineage2.length);
    let commonAncestor = null;
    for (let i = 0; i < minLength; i++) {
      if (lineage1[i] === lineage2[i]) {
        commonAncestor = lineage1[i]
      } else {
        break;
      }
    }
    return commonAncestor;
  }

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }
    for (const offspring of this.offspring) {
      const foundVampire = offspring.vampireWithName(name);
      if (foundVampire) {
        return foundVampire;
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let totalDescendents = 0;
    for (const offspring of this.offspring) {
        totalDescendents += 1 + offspring.totalDescendents;
    }
    return totalDescendents;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millennialVampires = [];
    if (this.yearConverted > 1980) {
      millennialVampires.push(this);
    }
    for (const offspring of this.offspring) {
      millennialVampires = millennialVampires.concat(offspring.allMillennialVampires);
    }
    return millennialVampires;
  }
}

module.exports = Vampire;

