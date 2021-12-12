import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import base_url from "../api/bootapi";
//import axios from "axios";
//import { callApi, selectApi } from "../Reducers/apiSlice";
import { ToastContainer, toast } from "react-toastify";
import { Form, FormGroup, Label, Button, Input, Container } from "reactstrap";
//import useListApi from "./useListApi";

const Login = () => {
  return (
    <Form>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="with a placeholder"
          type="email"
        />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="password placeholder"
          type="password"
        />
      </FormGroup>

      <Button>Login</Button>
    </Form>
  );
};

export default Login;
