import React, { Component } from "react";
import { RelatedNews, NewsBody, NewsHeader } from "./components";
import {
  entertaiment01,
  entertaiment02,
  entertaiment03,
  entertaiment05,
  entertaiment04,
  entertaiment06,
  entertaiment07,
} from "../../Assets/images";
import Divider from "../../Components/Divider";
import firebase from "../../Config/Firebase";

class SingleNewsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      news: {},
      key: "",
    };
    this.updatePredicate = this.updatePredicate.bind(this);
  }

  componentDidMount() {
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);
    const ref = firebase
      .firestore()
      .collection("News")
      .doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          news: doc.data(),
          key: doc.id,
          isLoading: false,
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePredicate);
  }
  updatePredicate() {
    this.setState({ isMobile: window.innerWidth > 600 });
  }

  delete(id) {
    firebase
      .firestore()
      .collection("News")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        this.props.history.push("/");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  render() {
    const isMobile = this.state.isMobile;
    return (
      <>
        <NewsBody
          header={this.state.news.header}
          image={this.state.news.imageURL}
          body={this.state.news.body}

          image1={entertaiment02}
          image3={entertaiment05}
          image4={entertaiment04}
          image5={entertaiment06}
          image6={entertaiment07}
          isMobile={isMobile}
        />
        <NewsHeader isMobile={isMobile} />

        <Divider title="Related News" />
        <RelatedNews
          image={entertaiment01}
          image2={entertaiment07}
          image3={entertaiment03}
        />
      </>
    );
  }
}

export default SingleNewsPage;
