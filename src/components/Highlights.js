import React from "react";
import Card from "./ui/Card";
import saladImg from "../assets/salad.jpg";
import lemondessert from "../assets/lemondessert.jpg";
import bruchetta from "../assets/bruchetta.jpg";

import classes from "./Highlights.module.css";

export default function Highlights() {
  return (
    <section className={classes.Highlights}>
      <div>
        <div className={classes.titleContainer}>
          <h1>This weeks specials</h1>
          <div className={classes.ButtonLayout}>
            <button
              className={classes.ButtonOnline}
              onClick={() => {}}
            >
              Online Menu
            </button>
          </div>
        </div>
      </div>

      <div className={classes.cardContainer}>
        <Card
          image={saladImg}
          name="Greek Salad"
          title="Greek Salad"
          price="$12.99"
          description="A traditional Greek salad consists of sliced cucumbers, tomatoes, green bell pepper, red onion, olives, and feta cheese."
        />
        <Card
          image={bruchetta}
          name="Bruchetta"
          title="Bruchetta"
          price="$5.99"
          description="Bruschetta is an antipasto from Italy consisting of grilled bread rubbed with garlic and topped with olive oil and salt."
        />
        <Card
          image={lemondessert}
          name="Lemon Dessert"
          title="Lemon Dessert"
          price="$5.00"
          description="This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined."
        />
      </div>
    </section>
  );
}
