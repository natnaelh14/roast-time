import Image from 'next/image';

export const Photos = () => {
  return (
    <div className="my-5 flex flex-wrap justify-around">
      <div className="m-4">
        <Image
          alt="shopping-item"
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDkxMTF8MHwxfHNlYXJjaHwyfHxjb2ZmZWUlMjBzaG9wfGVufDB8fHx8MTY2MTQ0ODA4Ng&ixlib=rb-1.2.1&q=80&w=400"
          width={200}
          height={150}
        />
      </div>
      <div className="m-4">
        <Image
          alt="shopping-item"
          src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDkxMTF8MHwxfHNlYXJjaHwzfHxjb2ZmZWUlMjBzaG9wfGVufDB8fHx8MTY2MTQ0ODA4Ng&ixlib=rb-1.2.1&q=80&w=400"
          width={200}
          height={150}
        />
      </div>
      <div className="m-4">
        <Image
          alt="shopping-item"
          src="https://images.unsplash.com/photo-1525193612562-0ec53b0e5d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDkxMTF8MHwxfHNlYXJjaHw0fHxjb2ZmZWUlMjBzaG9wfGVufDB8fHx8MTY2MTQ0ODA4Ng&ixlib=rb-1.2.1&q=80&w=400"
          width={200}
          height={150}
        />
      </div>
      <div className="m-4">
        <Image
          alt="shopping-item"
          src="https://images.unsplash.com/photo-1511081692775-05d0f180a065?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDkxMTF8MHwxfHNlYXJjaHw3fHxjb2ZmZWUlMjBzaG9wfGVufDB8fHx8MTY2MTQ0ODA4Ng&ixlib=rb-1.2.1&q=80&w=400"
          width={200}
          height={150}
        />
      </div>
      <div className="m-4">
        <Image
          alt="shopping-item"
          src="https://images.unsplash.com/photo-1542372147193-a7aca54189cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDkxMTF8MHwxfHNlYXJjaHwxOXx8Y29mZmVlJTIwc2hvcHxlbnwwfHx8fDE2NjM3OTk0NjQ&ixlib=rb-1.2.1&q=80&w=400"
          width={200}
          height={150}
        />
      </div>
      <div className="m-4">
        <Image
          alt="shopping-item"
          src="https://images.unsplash.com/photo-1522008174174-1a7e4c12078f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDkxMTF8MHwxfHNlYXJjaHwyNHx8Y29mZmVlJTIwc2hvcHxlbnwwfHx8fDE2NjM3OTk0NjQ&ixlib=rb-1.2.1&q=80&w=400"
          width={200}
          height={150}
        />
      </div>
    </div>
  );
};
