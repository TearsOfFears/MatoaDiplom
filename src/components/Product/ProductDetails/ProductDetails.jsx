import React from 'react'

function ProductDetails(product) {
    const {productDesc} = product
  return (
    <section class="details">
    <div className="container">
        <div className="row">
            <div className="wrapper-details">
               <div className="header-details">
                   <ul className="header-details__list">
                       <li className="nav-link active">Detail</li>
                       <li className="nav-link"> Warranty</li>
                       <li className="nav-link">Custom Engrave</li>
                       <li className="nav-link">How to Adjust</li>
                       <li className="nav-link">How to Care</li>
                       <li className="nav-link">Gallery</li>
                   </ul>
               </div>
               <div className="header-info">
               <div dangerouslySetInnerHTML={{ __html: productDesc }} />
                <h2 className="tilte">Material</h2>
                <p className="text">MATOA Way Kambas - Sumatran Rhino comes with a material form of Makassar Ebony (Diospyros celebica). This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin. Sumatran Rhino has unique skin fold, the skin is fairly thin about 10-16mm, and is soft and pliable.</p>
                <h2 className="tilte">Case</h2>
                <p className="text">MATOA Way Kambas - Sumatran Rhino comes with a material form of Makassar Ebony (Diospyros celebica). This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin. Sumatran Rhino has unique skin fold, the skin is fairly thin about 10-16mm, and is soft and pliable.</p>
                <h2 className="tilte">Movement</h2>
                <p className="text">MATOA Way Kambas - Sumatran Rhino comes with a material form of Makassar Ebony (Diospyros celebica). This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin. Sumatran Rhino has unique skin fold, the skin is fairly thin about 10-16mm, and is soft and pliable.</p>
                <h2 className="tilte">Dial</h2>
                <p className="text">MATOA Way Kambas - Sumatran Rhino comes with a material form of Makassar Ebony (Diospyros celebica). This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin. Sumatran Rhino has unique skin fold, the skin is fairly thin about 10-16mm, and is soft and pliable.</p>
                <h2 className="tilte">Hand</h2>
                <p className="text">MATOA Way Kambas - Sumatran Rhino comes with a material form of Makassar Ebony (Diospyros celebica). This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin. Sumatran Rhino has unique skin fold, the skin is fairly thin about 10-16mm, and is soft and pliable.</p>
                <h2 className="tilte">Important to Note</h2>
                <p className="text">MATOA Way Kambas - Sumatran Rhino comes with a material form of Makassar Ebony (Diospyros celebica). This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin. Sumatran Rhino has unique skin fold, the skin is fairly thin about 10-16mm, and is soft and pliable.</p>
                    <div className="block-img">
                        <img src="../../img/kambas-mini/image 40.png" alt=""/>
                    </div>
            </div>

            </div>
        </div>
    </div>
</section>
  )
}

export default ProductDetails