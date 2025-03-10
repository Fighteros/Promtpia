import PromptCard from "./PromptCard"



const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {name} Profile
        </span>
        <p className="desc text-lefts">
          {desc}
        </p>
        <div className="mt-10 prompt_layout">
          {data.map(post =>
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          )}
        </div>
      </h1>
    </section>
  )
}

export default Profile