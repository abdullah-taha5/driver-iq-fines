import React from 'react';

function PopularQuestions() {
  return (
    <section className="container py-5 my-4 my-sm-0 py-sm-6 py-md-7">
        <h2 className="text-center pb-2 mb-5">أسألة عامة</h2>
        <div className="row pb-2">
          <div className="col-lg-6">
            <div className="accordion" id="faq">
              <div className="accordion-item shadow">
                <h2 className="accordion-header" id="faq-heading-1">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-1" aria-expanded="false" aria-controls="faq-content-1">How can I create a list of frequent destinations?</button>
                </h2>
                <div className="accordion-collapse collapse" id="faq-content-1" aria-labelledby="faq-heading-1" data-bs-parent="#faq">
                  <div className="accordion-body">
                    <div className="fs-sm">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</div>
                  </div>
                </div>
              </div>
              <div className="accordion-item shadow">
                <h2 className="accordion-header" id="faq-heading-2">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-2" aria-expanded="false" aria-controls="faq-content-2">What will happen after I sign up?</button>
                </h2>
                <div className="accordion-collapse collapse" id="faq-content-2" aria-labelledby="faq-heading-2" data-bs-parent="#faq">
                  <div className="accordion-body">
                    <div className="fs-sm">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</div>
                  </div>
                </div>
              </div>
              <div className="accordion-item shadow">
                <h2 className="accordion-header" id="faq-heading-3">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-3" aria-expanded="false" aria-controls="faq-content-3">Do I have to confirm all bookings?</button>
                </h2>
                <div className="accordion-collapse collapse" id="faq-content-3" aria-labelledby="faq-heading-3" data-bs-parent="#faq">
                  <div className="accordion-body">
                    <div className="fs-sm">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</div>
                  </div>
                </div>
              </div>
              <div className="accordion-item shadow">
                <h2 className="accordion-header" id="faq-heading-4">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-4" aria-expanded="false" aria-controls="faq-content-4">What do I get for the commission I pay?</button>
                </h2>
                <div className="accordion-collapse collapse" id="faq-content-4" aria-labelledby="faq-heading-4" data-bs-parent="#faq">
                  <div className="accordion-body">
                    <div className="fs-sm">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-none d-lg-block col-lg-5 offset-lg-1"><img src="https://demo.moxcreative.com/moxpay/wp-content/uploads/sites/60/2021/08/about_us-1.png" alt="Illustration"/></div>
        </div>
      </section>
  )
}

export default PopularQuestions