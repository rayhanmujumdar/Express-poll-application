const Poll = require("./Poll");
exports.createPollGetController = (req, res, next) => {
  res.render("create");
};
exports.createPollPostController = async (req, res, next) => {
  let { title, description, options } = req.body;
  options = options.map((opt) => {
    return {
      name: opt,
      vote: 0,
    };
  });

  const poll = new Poll({
    title,
    description,
    options,
  });
  console.log(poll);
  try {
    await poll.save();
    res.redirect("./polls");
  } catch (err) {
    console.log(err);
  }
  res.render("create");
};

exports.getAllPolls = async (req, res, next) => {
  try {
    const polls = await Poll.find();
    res.render("polls", { polls });
  } catch (e) {
    console.log(e);
  }
};

exports.viewPollGetController = async(req, res, next) => {
  const id = req.params.id
  const poll = await Poll.findById(id)
  const options = [...poll.options]
  const result = []
  options.forEach(option => {
    const parentage = (option.vote * 100) / poll.totalVote
    result.push({
      ...option._doc,
      parentage: parentage ? parentage : 0
    })
  })
  res.render('viewPoll',{poll,result});
};

exports.viewPollPostController = async (req, res,next) => {
  const id = req.params.id
  const optionId = req.body.option
  try{  
    const poll = await Poll.findById(id)
    const index = poll.options.findIndex(o => o.id === optionId)
    const options = [...poll.options]
    options[index].vote = options[index]?.vote + 1
    let totalVote = poll.totalVote + 1
    await Poll.findByIdAndUpdate({_id: poll._id},{$set: {options,totalVote}})
    res.redirect('/polls/' + id)
  }catch (e){
    console.log(e)
  }
}
