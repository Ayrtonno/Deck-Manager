import React from "react"
import {useGetUserInfoQuery } from "../../store/api/userApi"


const UserInfoPage = () => {

    const {data: user} = useGetUserInfoQuery()
  
   return (
       <div>
            <h1>userInfoPage</h1>
            <div>
                {JSON.stringify(user)}
            </div>
            <br/>
            <h3>{user?.password}</h3>            
        </div>
    )
}

export default UserInfoPage;