import React, { Fragment, useRef, useState } from 'react'
import { modalState } from '../../../common/atomos/modalAtom'
import { useRecoilState } from 'recoil'
import { Dialog, Transition } from '@headlessui/react'
import { CameraIcon } from '@heroicons/react/solid'
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db, storage } from '../../../firebase'
import { useSession } from 'next-auth/react'
import { ref, uploadString, getDownloadURL } from 'firebase/storage'

const Modal = props => {
  const [open, setOpen] = useRecoilState(modalState)
  const filePicker = useRef()
  const captionRef = useRef()
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession()

  const uploadPost = async () => {
    if (loading) return


    setLoading(true)
    //  Create a post and add to firebase
    //   get postID for the newly post
    //   upload image to firebase with postID
    //   get a download url from storage

    const docRef = await addDoc(collection(db, 'posts'), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImage: session.user.image,
      timestamp: serverTimestamp()
    })

    const imageRef = ref(storage, `posts/${docRef.id}/image`)

    const message4 = 'data:text/plain;base64,5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';

    uploadString(imageRef, selectedFile, 'data_url').then(async snapshot => {
      const downloadURL = await getDownloadURL(imageRef)
      await updateDoc(doc(db, 'posts', docRef.id), {
        image: downloadURL
      })
    }).catch(err => {
      console.log(err)
    })

    setOpen(false)
    setLoading(false)
    setSelectedFile(null)
  }

  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      console.log(readerEvent)
      setSelectedFile(readerEvent.target.result)
    }
  }
  return (
    <Transition.Root
      show={open}
      as={Fragment}
    >
      <Dialog
        onClose={() => setOpen(false)}
        as='div'
        className='fixed z-10 inset-0 overflow-y-auto'
      >
        <div
          className='flex items-center justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>
          <span
            className='inline-block h-screen align-middle'
            aria-hidden='true'
          >
              &#8203;
            </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div
              className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
              <div>
                <div>
                  {selectedFile ? (
                    <img
                      src={selectedFile}
                      className='w-full object-contain cursor-pointer'
                      onClick={() => setSelectedFile(null)}
                      alt=''
                    />
                  ) : (
                    <div onClick={() => filePicker.current.click()}
                         className='mx-auto flex items-center rounded-full bg-red-100 w-16 h-16 justify-center cursor-pointer'>
                      <CameraIcon
                        aria-hidden='true'
                        className='h-6 w-6 text-red-600'
                      />
                    </div>
                  )}
                </div>
                <div className='mt-3 text-center'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Upload Post
                  </Dialog.Title>

                  <div>
                    <input type='file' hidden ref={filePicker} onChange={addImageToPost} />
                  </div>
                  <div className='mt-2'>
                    <input
                      ref={captionRef}
                      type='text'
                      className='border-none focus:ring-0 w-full text-center'
                      placeholder='Please enter the caption...'
                    />
                  </div>

                  <div className='mt-5 sm:mt-6'>
                    <button
                      type='button'
                      className='inline-flex flex-1 w-full justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                      onClick={uploadPost}
                    >
                      {loading ? "Uploading..." : "Upload"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default Modal
