export default function userProfile({params}:any){
    return(
        <div className="flex flex-col bg-red-600 items-center justify-center min-h-screen py-2 gap-2">
            <h1 className="text-4xl">Profile</h1>
            <hr />
            <p>Profilepage of the user <span className="text-2xl bg-red-600 font-bold">{params.id}</span></p>

        </div>
    )
}