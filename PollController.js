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
  res.render('viewPoll',{poll});
};
